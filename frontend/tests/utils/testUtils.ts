import mockedData from '../data/mock.json';

export default function mockFetch(filterString: string) {
  const coincidences = mockedData.data.filter((user: { [key: string]: string }) => {
    return Object.keys(user).some((key) =>
      user[key].toString().toLowerCase().includes(filterString.toLowerCase())
    );
  });

  vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: coincidences,
        }),
    }) as Promise<Response>;
  });
}
