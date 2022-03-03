import { useState, useEffect } from 'react';
import Account from './account.component';
import { supabase } from './functions';
import Auth from './login.component';

function SupaBase() {


  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
  )
}

export default SupaBase;
