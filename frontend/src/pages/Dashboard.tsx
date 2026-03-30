import React, { useState, useEffect } from 'react'

import api from "../services/api"

import Navbar from '../components/Navbar'



interface Funcionario {

  id: number;

  nome: string;

  dataAdmissao: string;

  salario: number;

  status: string;

}



export default function Dashboard() {

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])

  const [nome, setNome] = useState('')

  const [salarioExibicao, setSalarioExibicao] = useState('') // Estado para o input com máscara

  const [dataAdmissao, setDataAdmissao] = useState('')



  useEffect(() => {

    carregarFuncionarios()

  }, [])



  const carregarFuncionarios = async () => {

    try {

      const { data } = await api.get('/api/funcionarios')

      setFuncionarios(data)

    } catch (error) {

      console.error("Erro ao carregar funcionários", error)

    }

  }



  // Função para formatar o número enquanto o usuário digita

  const formatarMoeda = (valor: string) => {

    const apenasNumeros = valor.replace(/\D/g, '');

    if (!apenasNumeros) return '';



    const valorNumerico = parseFloat(apenasNumeros) / 100;



    return new Intl.NumberFormat('pt-BR', {

      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

    }).format(valorNumerico);

  }



  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const formatado = formatarMoeda(e.target.value);

    setSalarioExibicao(formatado);

  }



  const handleToggleStatus = async (id: number, statusAtual: string) => {
    const novoStatus = statusAtual.toUpperCase() === 'ATIVO' ? 'Inativo' : 'Ativo';
    try {
      await api.patch(`/api/funcionarios/${id}/status`, { status: novoStatus });
      carregarFuncionarios();
    } catch (error) {
      console.error("Erro ao alterar status", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()



    // Converção de "1.500,50" de volta para 1500.50 antes de enviar para a API

    const salarioParaEnviar = parseFloat(

      salarioExibicao.replace(/\./g, '').replace(',', '.')

    );



    try {

      await api.post('/api/funcionarios', {

        nome,

        salario: salarioParaEnviar,

        dataAdmissao

      })



      // Reset de campos

      setNome('')

      setSalarioExibicao('')

      setDataAdmissao('')

      carregarFuncionarios()

    } catch (error) {

      console.error("Erro ao cadastrar funcionário", error)

    }

  }



  return (

    <div className="min-h-screen bg-[#060818] flex flex-col font-sans text-gray-200">

      <Navbar />



      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8">



        {/* Header da Página */}

        <div className="flex flex-col mb-10 mt-6 relative z-10">

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide flex items-center gap-4">

            <span className="text-[#00bbff] text-5xl">|</span>

            Painel de Controle

          </h1>

          <p className="text-gray-400 mt-2 max-w-2xl text-base leading-relaxed ml-6">

            Gerencie todos os funcionários do sistema de forma rápida e segura.

          </p>

        </div>



        {/* Card do Formulário */}

        <div className="bg-[#0f122b]/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/5 p-6 md:p-8 mb-10 transition-all hover:border-[#00bbff]/30">

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

            <div className="space-y-2">

              <label className="text-sm font-semibold text-gray-300 block">Nome Completo</label>

              <input

                placeholder="Ex. João Silva"

                value={nome}

                onChange={e => setNome(e.target.value)}

                className="w-full p-3 rounded-xl border border-gray-700 bg-[#060818] text-white placeholder-gray-600 focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300"

                required

              />

            </div>



            <div className="space-y-2">

              <label className="text-sm font-semibold text-gray-300 block">Salário (R$)</label>

              <input

                placeholder="0,00"

                type="text"

                value={salarioExibicao}

                onChange={handleSalarioChange}

                className="w-full p-3 rounded-xl border border-gray-700 bg-[#060818] text-white placeholder-gray-600 focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300 font-mono"

                required

              />

            </div>



            <div className="space-y-2">

              <label className="text-sm font-semibold text-gray-300 block">Data de Admissão</label>

              <input

                type="date"

                value={dataAdmissao}

                min="2000-01-01"

                max={new Date().toISOString().split("T")[0]}

                onChange={e => setDataAdmissao(e.target.value)}

                className="w-full p-3 rounded-xl border border-gray-700 bg-[#060818] text-white focus:bg-[#060818] focus:border-[#00bbff] focus:ring-2 focus:ring-[#00bbff]/30 outline-none transition-all duration-300"

                required

              />

            </div>



            <button

              type="submit"

              className="w-full h-[52px] bg-[#00bbff] cursor-pointer hover:bg-[#009ee6] active:bg-[#008acc] text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(0,187,255,0.3)] hover:shadow-[0_0_25px_rgba(0,187,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2"

            >

              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>

              </svg>

              CADASTRAR

            </button>

          </form>

        </div>



        {/* Tabela de Resultados */}

        <div className="bg-[#0f122b]/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/5 overflow-hidden transition-all hover:border-[#00bbff]/20">

          <div className="px-6 py-5 border-b border-white/5 bg-[#0a0c1f] flex flex-col sm:flex-row justify-between items-center gap-4">

            <h2 className="font-bold text-white text-xl tracking-wide flex items-center gap-2">

              <span className="w-2 h-6 bg-[#00bbff] rounded-sm"></span>

              Lista de Funcionários

            </h2>

            <span className="text-sm font-bold bg-[#00bbff]/10 text-[#00bbff] px-4 py-1.5 rounded-full flex items-center gap-2 border border-[#00bbff]/20">

              <div className="w-2 h-2 rounded-full bg-[#00bbff] animate-pulse"></div>

              {funcionarios.length} Registros

            </span>

          </div>



          <div className="overflow-x-auto">

            <table className="w-full border-collapse text-left text-sm whitespace-nowrap">

              <thead>

                <tr className="bg-[#060818] border-b border-white/10">

                  <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-widest text-xs">Identificação</th>

                  <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-widest text-xs">Remuneração</th>

                  <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-widest text-xs">Data de Admissão</th>

                  <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-widest text-xs text-center">Status</th>

                </tr>

              </thead>

              <tbody className="divide-y divide-white/5">

                {funcionarios.length === 0 ? (

                  <tr>

                    <td colSpan={3} className="px-6 py-16 text-center text-gray-500">

                      Nenhum colaborador encontrado no ecossistema.

                    </td>

                  </tr>

                ) : (

                  funcionarios.map(f => (

                    <tr key={f.id} className="hover:bg-white/[0.02] transition-colors group">

                      <td className="px-6 py-4 text-gray-300 font-medium group-hover:text-white transition-colors">{f.nome}</td>

                      <td className="px-6 py-4 text-gray-400 font-mono tracking-tight text-base">

                        {Number(f.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

                      </td>

                      <td className="px-6 py-4 text-gray-300 font-medium group-hover:text-white transition-colors">{f.dataAdmissao}</td>



                      <td className="px-6 py-4 w-32">

                        <div className="flex justify-center">

                          <button
                            onClick={() => handleToggleStatus(f.id, f.status)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 border cursor-pointer hover:scale-105 transition-transform ${f.status?.toUpperCase() === 'ATIVO'

                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:bg-emerald-500/20'

                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)] hover:bg-rose-500/20'

                              }`}>

                            <span className={`w-1.5 h-1.5 rounded-full ${f.status?.toUpperCase() === 'ATIVO' ? 'bg-emerald-400' : 'bg-rose-400'

                              }`}></span>

                            {f.status.toUpperCase()}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>

  )

}