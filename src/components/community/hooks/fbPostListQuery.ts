import { db } from "chFirebase";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  SnapshotMetadata,
  startAfter,
} from "firebase/firestore";
import { RefObject, useCallback, useEffect, useState } from "react";

interface FbPostData {
  createAt: number;
  photos: string[];
  postCategory: string;
  postText: string;
  postTitle: string;
  userId: string;
  userName: string;
}
export interface CLPostData extends FbPostData {
  postId: string;
}

export function useFbPostListQuery(
  postLimit: number,
  traget?: RefObject<HTMLDivElement>
) {
  const [postData, setPostData] = useState<CLPostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [plusLoading, setPlustLoading] = useState(false);

  const [key, setKey] = useState<DocumentData>();
  const [noMore, setNoMore] = useState(false);

  const FirstPage = useCallback(async () => {
    const queryRef = query(
      collection(db, "Posts"),
      orderBy("createAt", "desc"),
      limit(postLimit)
    );
    try {
      setLoading(true);
      const snap = await getDocs(queryRef);
      const currPostData = snap.docs.map((doc) => ({
        postId: doc.id,
        ...(doc.data() as FbPostData),
      }));
      setPostData(currPostData);

      const lastVisible = snap.docs[snap.docs.length - 1];
      setKey(lastVisible as DocumentData);

      const next = query(collection(db, "Posts"), limit(5));
      console.log(next);
      return { postData, lastVisible };
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [postLimit]);

  const nextPage = useCallback(async () => {
    const queryRef = query(
      collection(db, "Posts"),
      orderBy("createAt", "desc"),
      startAfter(key),
      limit(postLimit)
    );

    try {
      const snap = await getDocs(queryRef);
      if (snap.empty) {
        setNoMore(true);
      } else {
        setKey(snap.docs[snap.docs.length - 1]);
      }
      const currPostData = snap.docs.map((doc) => ({
        postId: doc.id,
        ...(doc.data() as FbPostData),
      }));
      setPostData((prev) => [...prev, ...currPostData]);
    } catch (error) {
      console.log(error);
    }
  }, [key, postLimit]);

  useEffect(() => {
    FirstPage();
  }, [FirstPage]);

  return { postData, loading, noMore, plusLoading };
}
