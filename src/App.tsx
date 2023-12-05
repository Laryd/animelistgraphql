import { ReactNode } from "react";
import "./App.css";
import { useQuery, gql, DocumentNode, TypedDocumentNode, OperationVariables, QueryDataOptions, QueryHookOptions } from "@apollo/client";

const AnimeList: DocumentNode = gql`
  query Query {
    Page {
      media {
        siteUrl
        title {
          english
          native
        }
        description
        coverImage {
          medium
        }
        bannerImage
        volumes
        episodes
      }
    }
  }
`;
type Anime = {
  coverImage: {
    medium: string;
  };
  title: {
    english: string;
  };
  episodes: ReactNode;
  description: string;
};
function App() {
  const { loading, error, data } = useQuery(AnimeList);
  return loading ? (
    <> Loading</>
  ) : error ? (
    <>{JSON.stringify(error)}</>
  ) : (
    <div className="container">
      <h1> 🐈 Anime List </h1>
      <hr className="width1" />
      {data?.Page?.media.map((anime: Anime) => (
        <>
          <div className="card">
            <img src={anime.coverImage.medium} alt="cover image" />
            <div>
              <h1>{anime.title.english} </h1>
              <div className="episodes">
                <b>Episodes</b> <b className="bolded">{anime.episodes} </b>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: anime.description }}
              ></div>
            </div>
          </div>
          <hr className="width2" />
        </>
      ))}
    </div>
  );
}

export default App;
