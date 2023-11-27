export default async (_gasket, transaction, { req }) => {
  const route = await req.getNextRoute();
  if (!route) {
    return;
  }

  transaction.name = route.page;

  const match = route.namedRegex.exec(req.url);
  const groups = match && match.groups;
  if (!groups) {
    return;
  }

  transaction.addLabels(
    Object.fromEntries(
      Object.entries(groups).map(([key, value]) => [key, decodeURIComponent(value)])
    )
  );
};
