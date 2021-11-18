import React from "react";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Pagination } from "semantic-ui-react";

export default function Paginador(props) {
  const { totalArticulos, page, limitPerPage } = props;
  const totalPages = Math.ceil(totalArticulos / limitPerPage);
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };
  return (
    <div className="container pagination__global mt-2 mb-5">
      <Pagination
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
