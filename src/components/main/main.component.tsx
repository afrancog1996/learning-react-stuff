import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function Main() {
  const Welcome = lazy(() => import("../welcome/welcome.component"));
  const Instagram = lazy(
    () => import("../../apps/instagram/instagram.component")
  );
  const Spotify = lazy(() => import("../../apps/spotify/spotify.component"));
  const Supabase = lazy(() => import("../../apps/supabase/supabase.component"));
  const NotFound = lazy(() => import("../404/notfound.component"));
  const InWork = lazy(() => import("../inWork/inwork.component"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Supabase />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/spotify-app" element={<Spotify />}></Route>
        <Route path="/supabase-app" element={<Supabase />}></Route>
        <Route path="/instagram-clone" element={<Instagram />}></Route>
        <Route path="/in-work" element={<InWork />}></Route>
        <Route path="**" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}

export default Main;
