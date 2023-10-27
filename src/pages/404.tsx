import Image from "next/image";

function pageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Image
        alt=""
        src="/../public/404.png"
        width={500}
        height={500}
        priority
      />
      <a href="https://storyset.com/web">Web illustrations by Storyset</a>
    </div>
  );
}

export default pageNotFound;
