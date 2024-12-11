import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const url = `https://api.unsplash.com/search/photos?client_id=${
    import.meta.env.VITE_API_KEY
  }&page=1`;

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>there was an error</h4>
      </section>
    );
  }
  const results = response.data.results;
  if (results.length < 1) {
    <section className="image-container">
      <h4>No results found</h4>
    </section>;
  }
  return (
    <div className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </div>
  );
};
export default Gallery;
