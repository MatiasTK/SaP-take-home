import { LuHeart } from 'react-icons/lu';

export default function Footer() {
  return (
    <footer className=" text-gray-500 py-4">
      <p className="flex justify-center items-center">
        Creado con <LuHeart className="mx-2 text-red-600" /> por{' '}
        <a
          href="https://github.com/MatiasTK"
          className="ms-2 text-gray-300 hover:text-white"
          target="blank"
          rel="noopener noreferrer"
        >
          MatiasTK
        </a>
      </p>
    </footer>
  );
}
