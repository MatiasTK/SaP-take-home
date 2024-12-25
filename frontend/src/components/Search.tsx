import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_TIME } from '@/constants';
import toast from 'react-hot-toast';
import { LuCircleX, LuInfo, LuSearch } from 'react-icons/lu';

export default function Search() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('q') || '';
  });
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

  useEffect(() => {
    const newPathName = debouncedSearch ? `?q=${debouncedSearch}` : '/';

    window.history.replaceState({}, '', newPathName);
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      setUsers([]);
      try {
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
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.message);
            console.error(error);
          });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        console.error(error);
      }
    } else {
      setUsers([]);
    }
  }, [debouncedSearch]);

  const renderUsers = () => {
    if (loading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4 grid-cols-1">
          <div className="bg-primary p-6 rounded-lg w-full animate-pulse h-48"></div>
          <div className="bg-primary p-6 rounded-lg w-full animate-pulse h-48"></div>
          <div className="bg-primary p-6 rounded-lg w-full animate-pulse h-48"></div>
        </div>
      );
    }

    if (users.length == 0 && search.length == 0) {
      return (
        <p className="mt-8 flex items-center gap-2" data-testid="no-users">
          <LuInfo size={24} className="text-blue-500" />
          No se realizó ninguna busqueda aún, <strong>prueba buscando un usuario.</strong>
        </p>
      );
    } else if (users.length == 0 && !loading) {
      return (
        <p className="mt-8 flex items-center gap-2" data-testid="not-found">
          <LuCircleX size={24} className="text-red-600" />
          No se encontraron usuarios con la propiedad: <strong>{search}</strong>
        </p>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4 grid-cols-1">
        {users.map((user) => (
          <ul
            className="bg-primary p-6 rounded-lg w-full  transition-transform transform hover:scale-105 hover:opacity-75
              animate-fadeInUp
          "
            data-testid="user-card"
          >
            {Object.entries(user).map(([key, value]) => (
              <li className="text-nowrap">
                <strong>{key}:</strong> {value as string}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-3xl ">Búsqueda</h2>
      <div className="flex items-center max-w-[50%] mt-8 rounded-xl ps-4 bg-tertiary bg-opacity-75 border border-gray-400  text-white focus:outline  focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-opacity-50 transition-colors duration-300 ease-in-out">
        <LuSearch className="text-gray-400" size={20} />
        <input
          type="text"
          defaultValue={search}
          className=" w-full bg-transparent ms-4 py-2
     placeholder:text-gray-300 outline-none"
          placeholder="Buscar usuario "
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {renderUsers()}
    </div>
  );
}
