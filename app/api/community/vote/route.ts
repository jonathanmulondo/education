import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { project_id, vote_type } = await request.json();

    // TODO: Get user_id from session/auth
    // For now, using placeholder
    const user_id = 'placeholder-user-id';

    if (!project_id || !vote_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (vote_type !== 'up' && vote_type !== 'down') {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('project_votes')
      .select('*')
      .eq('project_id', project_id)
      .eq('user_id', user_id)
      .single();

    if (existingVote) {
      // Update existing vote
      const { error } = await supabase
        .from('project_votes')
        .update({ vote_type })
        .eq('project_id', project_id)
        .eq('user_id', user_id);

      if (error) {
        console.error('Error updating vote:', error);
        return NextResponse.json(
          { error: 'Failed to update vote' },
          { status: 500 }
        );
      }
    } else {
      // Create new vote
      const { error } = await supabase
        .from('project_votes')
        .insert({
          project_id,
          user_id,
          vote_type,
        });

      if (error) {
        console.error('Error creating vote:', error);
        return NextResponse.json(
          { error: 'Failed to create vote' },
          { status: 500 }
        );
      }
    }

    // Get updated project stats
    const { data: project } = await supabase
      .from('community_projects')
      .select('upvotes, downvotes')
      .eq('id', project_id)
      .single();

    return NextResponse.json({
      success: true,
      upvotes: project?.upvotes || 0,
      downvotes: project?.downvotes || 0,
    });
  } catch (error) {
    console.error('Error in vote endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Remove vote
export async function DELETE(request: NextRequest) {
  try {
    const { project_id } = await request.json();
    const user_id = 'placeholder-user-id'; // TODO: Get from session

    const { error } = await supabase
      .from('project_votes')
      .delete()
      .eq('project_id', project_id)
      .eq('user_id', user_id);

    if (error) {
      console.error('Error deleting vote:', error);
      return NextResponse.json(
        { error: 'Failed to delete vote' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete vote endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
