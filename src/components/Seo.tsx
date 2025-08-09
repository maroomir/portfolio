import { useEffect } from "react";

type Props = {
  title?: string;
  description?: string;
};

export default function Seo({ title, description }: Props) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const prevDescription = meta.content;
    if (description) meta.content = description;

    return () => {
      // 페이지 전환 시 기본값으로 되돌리기
      if (title) document.title = prevTitle;
      if (description) meta!.content = prevDescription;
    };
  }, [title, description]);

  return null;
}
