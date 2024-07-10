import ArchivedCalls from '@/components/archived-calls';
import Header from '@/components/header';
import Inbox from '@/components/inbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchCalls } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['calls'], queryFn: fetchCalls });

  return (
    <main className='w-full max-w-3xl mx-auto p-6 flex-1 flex flex-col'>
      <Header />
      <Tabs defaultValue='inbox' className='flex-1 flex flex-col'>
        <TabsList className='w-full grid grid-cols-2 dark:bg-card'>
          <TabsTrigger value='inbox'>Inbox</TabsTrigger>
          <TabsTrigger value='archivedCalls'>Archived Calls</TabsTrigger>
        </TabsList>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TabsContent value='inbox' className='flex flex-col'>
            <Inbox />
          </TabsContent>
          <TabsContent value='archivedCalls' className='flex flex-col -mt-auto'>
            <ArchivedCalls />
          </TabsContent>
        </HydrationBoundary>
      </Tabs>
    </main>
  );
}
