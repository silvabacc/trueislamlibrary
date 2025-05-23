const discordInviteLink = process.env.NEXT_DISCORD_LINK;
const youtubeLink = process.env.NEXT_YOUTUBE_LINK;
const tiktokLink = process.env.NEXT_TIKTOK_LINK;

export default function Footer() {
  return (
    <footer className=" flex  shadow rounded-lg pb-4 absolute bottom-0 right-8">
      <ul className="flex items-center flex-wrap mb-6 md:mb-0">
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            {/* Example */}
          </a>
        </li>
      </ul>
      <div className="flex sm:justify-center space-x-6">
        {/* Discord */}
        <a
          href={discordInviteLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
        >
          <svg
            className="w-6 h-6 hover:text-indigo-400 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3c-.184.316-.388.73-.533 1.06a18.27 18.27 0 0 0-5.704 0 12.1 12.1 0 0 0-.546-1.06 19.791 19.791 0 0 0-3.432 1.369C3.356 8.06 2.28 11.58 2.7 15.042a19.9 19.9 0 0 0 5.993 3.01c.487-.672.92-1.385 1.29-2.132a11.778 11.778 0 0 1-1.82-.872c.153-.11.302-.224.445-.34a13.6 13.6 0 0 0 7.784 0c.145.117.294.23.445.34a11.778 11.778 0 0 1-1.82.872c.37.747.803 1.46 1.29 2.132a19.9 19.9 0 0 0 5.993-3.01c.5-4.17-.838-7.63-3.383-10.673zM8.02 13.545c-1.183 0-2.15-1.085-2.15-2.419 0-1.333.955-2.418 2.15-2.418 1.2 0 2.162 1.09 2.15 2.418 0 1.334-.955 2.419-2.15 2.419zm7.96 0c-1.183 0-2.15-1.085-2.15-2.419 0-1.333.955-2.418 2.15-2.418 1.2 0 2.162 1.09 2.15 2.418 0 1.334-.955 2.419-2.15 2.419z" />
          </svg>
        </a>
        {/* YouTube */}
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <svg
            className="w-6 h-6 hover:text-red-500 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.498 6.186a2.99 2.99 0 0 0-2.104-2.114C19.591 3.5 12 3.5 12 3.5s-7.591 0-9.394.572A2.99 2.99 0 0 0 .502 6.186C0 8.004 0 12 0 12s0 3.996.502 5.814a2.99 2.99 0 0 0 2.104 2.114C4.409 20.5 12 20.5 12 20.5s7.591 0 9.394-.572a2.99 2.99 0 0 0 2.104-2.114C24 15.996 24 12 24 12s0-3.996-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
          </svg>
        </a>
        {/* Tiktok */}

        <a
          href={tiktokLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          <svg
            className="w-6 h-6 hover:text-pink-500 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.75 2h2.25a5.25 5.25 0 0 0 5.25 5.25v2.25a7.5 7.5 0 0 1-5.25-2.25v7.5a5.25 5.25 0 1 1-5.25-5.25v2.25a3 3 0 1 0 3 3V2z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
