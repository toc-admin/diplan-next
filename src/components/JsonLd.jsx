// Server component: emits one <script type="application/ld+json"> per node.
const JsonLd = ({ data }) => {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return items.map((node, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
    />
  ));
};

export default JsonLd;
