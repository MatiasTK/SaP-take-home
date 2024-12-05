import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_TIME } from '@/constants';
import toast from 'react-hot-toast';

export default function Search() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('q') || '';
  });

  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

  useEffect(() => {
    const newPathName = debouncedSearch ? `?q=${debouncedSearch}` : '/';

    window.history.replaceState({}, '', newPathName);
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`http://localhost:3000/api/users?q=${debouncedSearch}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Error al buscar usuarios');
          }
        })
        .then((data) => {
          setUsers(data.data);
        })
        .catch((error) => {
          toast.error(`Ocurrió un error: ${error.message}`);
        });
    }
  });

  return (
    <div>
      <h2 className="text-3xl ">Búsqueda</h2>
      <input
        type="text"
        defaultValue={search}
        className="w-full mt-8 rounded
    py-2 px-4 bg-background border border-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300 ease-in-out"
        placeholder="Buscar usuario"
        onChange={(event) => setSearch(event.target.value)}
      />
      {users.length == 0 ? (
        <p className="mt-8">No se realizó ninguna busqueda</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4 grid-cols-1">
          {users.map((user) => (
            <ul
              className="bg-gray-800 p-6 rounded-lg w-full  transition-transform transform hover:scale-105 hover:bg-gray-700 animate-fadeInUp
          "
            >
              {Object.entries(user).map(([key, value]) => (
                <li className="text-nowrap">
                  <strong>{key}:</strong> {value as string}
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
