import { Turnstile } from '@marsidev/react-turnstile';

export default function TurnstileWidget({ onVerify }) {
  return (
    <Turnstile
      siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
      onSuccess={(token) => onVerify(token)}
      onError={() => onVerify(null)}
      onExpire={() => onVerify(null)}
      theme="light" 
      size="normal" 
    />
  );
}