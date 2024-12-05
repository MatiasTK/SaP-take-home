import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';

export default function SelectFile() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:3000/api/files', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Archivo subido correctamente');
      } else {
        toast.error('Error al subir el archivo');
      }
    }

    setFile(null);
  };

  return (
    <div>
      <h2 className="text-4xl">Cargar información</h2>
      <form className="py-12 flex gap-4" onSubmit={handleFormSubmit}>
        <Button onClick={handleFileSelect}>Seleccionar archivo CSV</Button>
        <input
          type="file"
          accept="text/csv"
          data-testid="file-input"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <Button disabled={!file} type="submit">
          Cargar archivo
        </Button>
      </form>
    </div>
  );
}
