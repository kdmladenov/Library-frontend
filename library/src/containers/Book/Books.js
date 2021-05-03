/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import server from "../../common/server";
import Loading from "../../components/UI/Loading";
import BookCard from "../../components/Books/BookCard";
import useHttp from "../../hooks/useHttp";

const Books = (props) => {
  const { data, loading, error } = useHttp(
    `${server.baseURL}/books`,
    "GET",
    [],
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const bookCardsToShow = (
    <div className="book-list">
      {data.map((book) => {
        return (
          <BookCard
            key={book.bookId}
            {...book}
            goToDetails={() => props.history.push(`/books/${book.bookId}`)}
          />
        );
      })}
    </div>
  );

  return (
    <main>
      {data.length ? <ul>{bookCardsToShow}</ul> : <div>Nothing found...</div>}
    </main>
  );
};
export default Books;
