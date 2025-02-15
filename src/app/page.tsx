import { Heading } from "@/components";
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center align-middle justify-center'>
      <ModeToggle />
      <Heading />
    </main>
  );
}
