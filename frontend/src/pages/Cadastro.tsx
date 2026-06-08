import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../services/api"

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setSucesso(false)
    try {
      await api.post('/api/auth/register', { nome, email, senha })
      setSucesso(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch {
      setErro('Erro ao cadastrar usuário. E-mail pode já estar em uso.')
    }
  }

  return (
    <div className="min-h-screen bg-[#060818] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Decorativo Estilo Neon */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00bbff] rounded-full mix-blend-screen overflow-hidden filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

      <div className="bg-[#0f122b]/60 backdrop-blur-2xl w-full max-w-md rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 md:p-10 border border-white/10 relative z-10 transition-all hover:border-[#00bbff]/30">

        <div className="flex flex-col items-center mb-10">
          <h2 className="text-[1.7rem] font-bold tracking-wide text-white text-center">
            <span className="text-[#00bbff] drop-shadow-[0_0_10px_rgba(0,187,255,0.4)]">Cadastre-se</span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 text-center tracking-wide">CRIE UMA NOVA CONTA DE ACESSO</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Nome</label>
            <div className="relative">
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                className="w-full p-3.5 rounded-xl border border-white/10 bg-[#060818]/80 text-white placeholder-gray-600 focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300"
                placeholder="Seu nome"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">E-mail</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full p-3.5 rounded-xl border border-white/10 bg-[#060818]/80 text-white placeholder-gray-600 focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300"
                placeholder="usuario@gestao.com.br"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Senha</label>
            <div className="relative">
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                className="w-full p-3.5 rounded-xl border border-white/10 bg-[#060818]/80 text-white placeholder-gray-600 focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {erro && (
            <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 p-3 rounded-xl flex items-center gap-3 text-sm font-semibold animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.1)]">
              {erro}
            </div>
          )}
          
          {sucesso && (
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-3 text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              Usuário cadastrado com sucesso! Redirecionando...
            </div>
          )}

          <button
            type="submit"
            className="cursor-pointer w-full h-[54px] mt-4 bg-[#00bbff] hover:bg-[#009ee6] active:bg-[#008acc] text-[#060818] uppercase font-bold tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,187,255,0.4)] hover:shadow-[0_0_30px_rgba(0,187,255,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Cadastrar
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cursor-pointer w-full h-[44px] mt-4 hover:bg-[#009ee6] active:bg-[#008acc] text-white uppercase font-bold tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,187,255,0.4)] hover:shadow-[0_0_30px_rgba(0,187,255,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Voltar para Login
          </button>
        </form>
      </div>
    </div>
  )
}
