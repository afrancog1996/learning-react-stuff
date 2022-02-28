import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

function Main() {
  const Welcome = lazy(() => import("../welcome/welcome.component"));
  const Instagram = lazy(
    () => import("../../apps/instagram/instagram.component")
  );
  const Spotify = lazy(() => import("../../apps/spotify/spotify.component"));
  const Supabase = lazy(() => import("../../apps/supabase/supabase.component"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/spotify-app" element={<Spotify />}></Route>
          <Route path="/supabase-app" element={<Supabase />}></Route>
          <Route path="/instagram-clone" element={<Instagram />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Main;
