import Close from './types/close'

const icons = {
  close: Close
};

export default function Icon({ type = null, ...rest }) {
  const IconComp = icons[type];
  if (!type || type === '' || !IconComp) return null;
  return <IconComp {...rest} />;
}