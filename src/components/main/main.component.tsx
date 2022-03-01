import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function Main() {
  const Welcome = lazy(() => import("../welcome/welcome.component"));
  const Instagram = lazy(
    () => import("../../apps/instagram/instagram.component")
  );
  const Spotify = lazy(() => import("../../apps/spotify/spotify.component"));
  const Supabase = lazy(() => import("../../apps/supabase/supabase.component"));

  return (
    <Routes>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/" element={<Welcome />}></Route>
      </Suspense>
      <Route path="/spotify-app" element={<Spotify />}></Route>
      <Route path="/supabase-app" element={<Supabase />}></Route>
      <Route path="/instagram-clone" element={<Instagram />}></Route>
    </Routes>
  );
}

export default Main;
