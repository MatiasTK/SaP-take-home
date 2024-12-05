import Search from './components/Search';
import SelectFile from './components/SelectFile';

function App() {
  return (
    <>
      <div className="bg-background min-h-screen text-white">
        <h1 className="text-4xl text-center py-8">Usuario</h1>
        <main className="container max-w-screen-lg mx-auto py-4 px-4">
          <SelectFile />
          <Search />
        </main>
      </div>
    </>
  );
}

export default App;
