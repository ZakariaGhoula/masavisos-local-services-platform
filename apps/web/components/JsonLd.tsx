interface JsonLdProps {
  data: object | object[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const json = Array.isArray(data)
    ? data.map((d) => JSON.stringify(d))
    : [JSON.stringify(data)];

  return (
    <>
      {json.map((j, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: j }}
        />
      ))}
    </>
  );
}
