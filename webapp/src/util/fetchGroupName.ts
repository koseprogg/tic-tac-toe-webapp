export const fetchGroupName = async (url: string) => {
  let groupName;
  // console.log(url);
  await fetch(url)
    .then((r) => r.json())
    .then((it) => (groupName = it.groupName))
    .catch((err) => {});
  return groupName;
};
