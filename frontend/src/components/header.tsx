import Image from 'next/image'
import Link from 'next/link'
export function Header() {
  return (
    <header className="flex h-8 w-full items-center justify-center bg-violet-600 p-2 lg:h-16">
      <Link href="/">
        <Image
          alt="main-logo"
          src="/main-logo.png"
          width={160}
          height={50}
          className="h-3/4 w-auto lg:h-full lg:w-auto"
        />
      </Link>
    </header>
  )
}
