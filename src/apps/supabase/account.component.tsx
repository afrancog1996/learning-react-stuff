import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "./functions";

export default function Account({ session }) {
  const [loading, setLoading] = useState<any>(true);
  const [username, setUsername] = useState<any>(null);
  const [website, setWebsite] = useState<any>(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [title, setTitle] = useState<any>(null);
  const [recordDate, setRecordDate] = useState<any>(new Date());
  const [creationDate, setCreationDate] = useState<any>(null);
  const [isFetch, setIsFetch] = useState<any>(false);
  const [recordID, setRecordID] = useState<any>(null);
  const [userid] = useState<any>(supabase.auth.user());
  const [listRecords, setListRecords] = useState<any>(null);

  useEffect(() => {
    if (avatar_url) downloadImage(avatar_url);
    getProfile();
    listrecord();
  }, [session, avatar_url, isFetch]);

  async function downloadImage(path: any) {
    try {
      const { error } = await supabase.storage.from("avatars").download(path);
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (user) {
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", user.id)
          .single();
        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteRecord() {
    try {
      const { error } = await supabase
        .from("recordatorios")
        .delete()
        .eq("id", recordID);
      if (error) {
        throw error;
      } else {
        setIsFetch(true);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsFetch(false);
    }
  }

  async function updateProfile(username, website, avatar_url) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      if (user) {
        const updates = {
          id: user.id,
          username,
          website,
          avatar_url,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });

        if (error) {
          throw error;
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function insertRecord(title, content, reminder) {
    console.log(title)
    console.log(content)
    console.log(recordID)
    if (recordID !== null && recordID !== "") {
      updateReminder();
    } else {
      try {
        const userid = supabase.auth.user();
        if (userid) {
          const updates = {
            user: userid.id,
            title,
            content,
            reminder: recordDate,
            created_at: new Date(),
          };

          let { error } = await supabase.from("recordatorios").insert(updates, {
            returning: "minimal", // Don't return the value after inserting
          });

          if (error) {
            throw error;
          } else {
            setIsFetch(true);
          }
        }
      } catch (error: any) {
        alert(error.message);
      } finally {
        setIsFetch(false);
      }
    }
  }

  async function updateReminder() {
    try {
      const user = userid;

      if (user) {
        const updates = {
          id: recordID,
          user: user.id,
          title: title,
          content: content,
          reminder: recordDate,
          created_at: new Date(),
        };

        let { error } = await supabase.from("recordatorios").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });

        if (error) {
          throw error;
        } else {
          setIsFetch(true);
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsFetch(false);
    }
  }
  async function listrecord() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      if (user) {
        let { data, error, status } = await supabase
          .from("recordatorios")
          .select(`*`)
          .eq("user", user.id);

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setListRecords(data);
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getRecord() {
    try {
      let { data, error, status } = await supabase
        .from("recordatorios")
        .select(`*`)
        .eq("id", recordID)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setRecordDate(data.reminder);
        setCreationDate(data.created_at);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
    }
  }

  const { t } = useTranslation();
  return (
    <div className="form-widget">
      <h1>{t("title1")}</h1>

      {/* <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile(username, website, url);
        }}
      /> */}

      <div>
        <label htmlFor="email">{t("field1")}</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">{t("field2")}</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">{t("field3")}</label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile(username, website, avatar_url)}
          disabled={loading}
        >
          {loading ? "Loading ..." : t("button2")}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          {t("button3")}
        </button>
      </div>

      <h1>BUSCAR Y MODIFICAR RECORD</h1>
      <div>
        <label htmlFor="title">{t("field4")}</label>
        <input
          id="title"
          type="text"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">{t("field5")}</label>
        <input
          id="content"
          type="text"
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="reminderdate">{t("field6")}</label>
        <input
          id="reminderdate"
          type="date"
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="creationDate">Fecha de creacion</label>
        <input
          id="creationDate"
          type="text"
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
          disabled={true}
        />
      </div>
      <div>
        <label htmlFor="idfield">id</label>
        <input
          id="idfield"
          type="text"
          onChange={(e) => setRecordID(e.target.value)}
        />

        <button className="button primary block" onClick={() => getRecord()}>
          {t("button4")}
        </button>
      </div>

      <button
        className="button block primary"
        onClick={() => insertRecord(title, content, recordDate)}
      >
        {recordID !== null && recordID !== "" ? t("button5v2") : t("button5")}
      </button>
      <button className="button block primary" onClick={() => deleteRecord()}>
        {t("button6")}
      </button>

      <h1>LISTA DE RECORDS</h1>
      {listRecords !== null
        ? listRecords.map((t) => (
            <li key={t.id}>
              {" "}
              ID: {t.id} Titulo: {t.title} - Contenido: {t.content} - Fecha de
              recordatorio: {t.reminder} - Fecha de creacion: {t.created_at} -
            </li>
          ))
        : ""}
    </div>
  );
}
