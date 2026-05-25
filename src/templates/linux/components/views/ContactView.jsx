export const renderContactView = ({ palette, profile }) => (
  <div className="space-y-2 max-w-3xl">
    <p className="text-white font-bold">OPEN PORTS / CONTACT:</p>
    {profile.contacts && profile.contacts.length > 0 ? (
      <div className="space-y-2">
        {profile.contacts.map((contact, idx) => (
          <div key={idx} className="flex gap-4 text-xs font-mono">
            <span className="text-neutral-500 w-24 uppercase">{contact.type}:</span>
            <a href={contact.href} target={contact.external ? "_blank" : undefined} rel="noreferrer" className={`${palette.text} hover:underline font-bold`}>
              {contact.text}
            </a>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-neutral-500 italic text-xs">No active links found.</p>
    )}
  </div>
);

