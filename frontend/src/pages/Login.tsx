import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../services/api"

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    try {
      const { data } = await api.post('/api/auth/login', { email, senha })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch {
      setErro('E-mail ou senha inválidos.')
    }
  }

  return (
    <div className="min-h-screen bg-[#060818] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Decorativo Estilo Neon */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00bbff] rounded-full mix-blend-screen overflow-hidden filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

      <div className="bg-[#0f122b]/60 backdrop-blur-2xl w-full max-w-md rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 md:p-10 border border-white/10 relative z-10 transition-all hover:border-[#00bbff]/30">

        <div className="flex flex-col items-center mb-10">
          {/* <div className="mb-6 group">
             Tornando a logo branca para combinar com o fundo escuro 
            <img src={logo} alt="SAAM Logo" className="h-[4.5rem] w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 brightness-0 invert" style={{ filter: 'brightness(0) invert(1)' }} />
          </div> */}
          <h2 className="text-[1.7rem] font-bold tracking-wide text-white text-center">
            <span className="text-[#00bbff] drop-shadow-[0_0_10px_rgba(0,187,255,0.4)]">Bem-vindo</span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 text-center tracking-wide">ACESSO RESTRITO AO PAINEL FUNCIONÁRIOS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500 focus-within:text-[#00bbff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-11 p-3.5 rounded-xl border border-white/10 bg-[#060818]/80 text-white placeholder-gray-600 focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300"
                placeholder="usuario@gestao.com.br"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                className="w-full pl-11 p-3.5 rounded-xl border border-white/10 bg-[#060818]/80 text-white placeholder-gray-600 focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {erro && (
            <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 p-3 rounded-xl flex items-center gap-3 text-sm font-semibold animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.1)]">
              <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="cursor-pointer w-full h-[54px] mt-4 bg-[#00bbff] hover:bg-[#009ee6] active:bg-[#008acc] text-[#060818] uppercase font-bold tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,187,255,0.4)] hover:shadow-[0_0_30px_rgba(0,187,255,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Fazer Login
            <svg className="w-5 h-5 text-[#060818]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}