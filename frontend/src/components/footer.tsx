import Link from 'next/link'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa6'

export function Footer() {
  return (
    <footer className="flex w-full justify-center gap-20 bg-zinc-600 px-2 py-4 text-sm text-white lg:p-8 lg:pb-2">
      <div className="hidden gap-16 xl:flex">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold tracking-wide ">
            Encontre seu veículo
          </h1>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Encontre seu veículo
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Lojas
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Promoções
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Vantagens
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Garantia Mais
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold tracking-wide">A Empresa</h1>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Delivery
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Aviso de Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Blog Seminovos
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold tracking-wide">Atendimento</h1>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Perguntas Frequentes
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Fale Conosco
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Pós-vendas
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold tracking-wide">Lojistas</h1>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/"
                className="transition-all duration-200 hover:text-white/70"
              >
                Acesse Seminovos Atacado
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8 xl:flex-row">
        <div className="flex flex-col gap-4">
          <h1 className="leading-snug tracking-wide">Atendimento ao cliente</h1>
          <div className="flex gap-4">
            <Link
              href="tel:0800000000"
              className="flex items-center justify-center rounded bg-violet-600 p-3 transition-all duration-200 hover:opacity-80"
            >
              <span className="font-bold">0800 000 000</span>
            </Link>
            <Link
              href="/"
              className="items-center justify-center rounded bg-green-500 p-3 transition-all duration-200 hover:opacity-80"
            >
              <FaWhatsapp size={24} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium leading-relaxed tracking-wide">
            Siga a gente
          </h1>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded bg-violet-600 p-2 transition-all duration-200 hover:opacity-80"
            >
              <FaFacebookF size={16} />
            </Link>
            <Link
              href="/"
              className="rounded bg-violet-600 p-2 transition-all duration-200 hover:opacity-80"
            >
              <FaInstagram size={16} />
            </Link>
            <Link
              href="/"
              className="rounded bg-violet-600 p-2 transition-all duration-200 hover:opacity-80"
            >
              <FaTwitter size={16} />
            </Link>
            <Link
              href="/"
              className="rounded bg-violet-600 p-2 transition-all duration-200 hover:opacity-80"
            >
              <FaLinkedinIn size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
