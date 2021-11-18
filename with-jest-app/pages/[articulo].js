import BasicLayout from "layouts/BasicLayout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Articulo() {
  const [state, setstate] = useState(null);
  const data = useRouter;
  console.log(data);
  return <BasicLayout className="articulo__global"></BasicLayout>;
}
