import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sort = searchParams.get('sort') || 'hot';
    const category = searchParams.get('category');
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '20');

    // Build query
    let query = supabase
      .from('community_projects')
      .select(`
        *,
        author:user_profiles!community_projects_user_id_fkey(*)
      `)
      .eq('is_published', true)
      .range(skip, skip + take - 1);

    // Filter by category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Sort
    switch (sort) {
      case 'new':
        query = query.order('created_at', { ascending: false });
        break;
      case 'top':
        query = query.order('upvotes', { ascending: false });
        break;
      case 'hot':
      default:
        // Hot algorithm: (upvotes - downvotes) / age_hours^1.5
        // For simplicity, sort by upvotes for now
        // TODO: Implement proper hot ranking
        query = query.order('upvotes', { ascending: false });
        break;
    }

    const { data: projects, error, count } = await query;

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      projects: projects || [],
      total: count || 0,
      skip,
      take,
      has_more: (count || 0) > skip + take,
    });
  } catch (error) {
    console.error('Error in community feed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
