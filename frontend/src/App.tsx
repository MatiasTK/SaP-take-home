import Search from '@/components/Search';
import SelectFile from '@/components/SelectFile';
import Footer from './components/ui/Footer';

function App() {
  return (
    <>
      <div className="bg-background min-h-screen text-white flex flex-col">
        <h1 className="text-4xl text-center py-8">Shaw and Partners</h1>
        <main className="container max-w-screen-lg mx-auto py-4 px-4 flex-1">
          <SelectFile />
          <Search />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
