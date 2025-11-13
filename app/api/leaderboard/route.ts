import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'all';
    const category = searchParams.get('category') || 'xp';
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('user_profiles')
      .select('*')
      .order(
        category === 'xp'
          ? 'total_xp'
          : category === 'streak'
          ? 'streak_days'
          : 'reputation',
        { ascending: false }
      )
      .limit(limit);

    // Filter by time period if needed
    if (period !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();

      switch (period) {
        case 'day':
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }

      query = query.gte('updated_at', cutoffDate.toISOString());
    }

    const { data: users, error } = await query;

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return NextResponse.json({ users: [] });
    }

    return NextResponse.json({ users: users || [] });
  } catch (error) {
    console.error('Error in leaderboard endpoint:', error);
    return NextResponse.json({ users: [] });
  }
}
