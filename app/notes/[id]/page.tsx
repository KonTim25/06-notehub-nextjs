import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

// interface NoteDetailsPageProps {
//     params: {
//         id: string;
//     };
// }


export default async function NoteDetailsPage({ params }: { params: {id: string} }) {
    const queryClient = new QueryClient();
    const { id } = await params;
    
    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}