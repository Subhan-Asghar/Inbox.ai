
export default function Home() {
  return (
    <>
    <p className="text-green-500">
      Gmail AI Agent is a smart assistant with a chat-style frontend built using Next.js, TypeScript, and the Vercel SDK. 
      It interacts with Gmail APIs to manage emails, powered by AI-driven logic for an intuitive and responsive user experience.
    </p>
    <button className="bg-blue-500 text-white h-7 w-20 rounded-xl font-bold m-3 text-center hover:bg-blue-400 pb-1.5" ><a href="/api/gmail/connect">Connect</a></button>
    <button className="bg-red-500 text-white h-7 w-25 rounded-xl font-bold m-3 text-center hover:bg-red-400 pb-1.5"><a href="/api/gmail/disconnect">Disconnect</a></button>
    </>
  );
}
