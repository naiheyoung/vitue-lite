const isDark = useDark({
  storageKey: 'vitue-color-scheme',
});
export const toggleDark = useToggle(isDark);