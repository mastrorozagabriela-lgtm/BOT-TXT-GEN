        function createPendingSteps(count) {
            return Array.from({ length: count }, (_, index) => ({
                title: `ETAPA ${index + 1} - CONTEÚDO PENDENTE`,
                condition: 'Conteúdo desta etapa pendente de definição.',
                speech: 'Conteúdo pendente de preenchimento.'
            }));
        }

        const defaultFlows = [
            {
                id: 'cpf-incorreto',
                title: 'CPF Incorreto',
                category: 'Validação de Dados',
                observation: 'Caso o cliente informe o CPF incorretamente, solicitar a confirmação novamente, totalizando até 3 tentativas. Se o CPF for validado em qualquer uma delas, avançar para a apresentação da dívida. Caso permaneça incorreto após a terceira tentativa, finalizar o atendimento.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação padrão Sem Parar',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: '1ª TENTATIVA',
                        condition: 'CPF inválido. Solicitar que o cliente confira e informe novamente.',
                        speech: 'O número que você enviou parece incompleto: o CPF tem 11 números e o CNPJ tem 14. Pode me enviar o documento completo, só com os números?'
                    },
                    {
                        title: '2ª TENTATIVA',
                        condition: 'CPF continua inválido. Reforçar a solicitação de correção.',
                        speech: 'O número ainda parece incompleto: o CPF tem 11 números e o CNPJ tem 14. Confira e me envie o documento completo, só com os números.'
                    },
                    {
                        title: '3ª TENTATIVA',
                        condition: 'CPF permanece inválido. Encerrar a tentativa de validação e direcionar para o fluxo de atendimento previsto para CPF não validado',
                        speech: 'Ainda não consegui identificar o seu documento. Vou encerrar o contato por aqui, mas você pode nos chamar novamente ou falar com o Sem Parar pelo SuperApp. Até mais!'
                    }
                ]
            },
            {
                id: 'acordo-vista',
                title: 'Acordo à Vista',
                category: 'Negociação',
                observation: 'Oferta principal de quitação com desconto via PIX. Desbloqueio da Tag ocorre em até 3 horas após compensação.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação de titularidade',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'CONTEXTUALIZAÇÃO DA FATURA',
                        condition: 'Após validação positiva do CPF/CNPJ',
                        speech: 'Pronto! Consta [X] faturas em atraso, no valor de R$ [VALOR]. O vencimento foi em [DD/MM/AA], totalizando [X] dias de atraso.\n\nConsegui uma condição especial para facilitar a quitação:\nR$ [VALOR] à vista com desconto.\n\nPosso enviar essa proposta?'
                    },
                    {
                        title: 'CONFIRMAÇÃO EM DUAS ETAPAS',
                        condition: 'Cliente aceita receber a proposta',
                        speech: 'A proposta é à vista, no valor de R$ [VALOR], com vencimento em [DD/MM], via PIX. Posso registrar o acordo nessas condições?'
                    },
                    {
                        title: 'ENVIO DO PIX + INSTRUÇÕES DE PAGAMENTO',
                        condition: 'Cliente confirma o registro do acordo',
                        speech: 'Pronto! Seu acordo foi formalizado com sucesso no valor de R$ [VALOR], com vencimento em [DD/MM].\n\nAntes de finalizar o pagamento, confira se o beneficiário é Sem Parar instituição de pagamento Ltda e verifique se todos os dados apresentados estão corretos.\n\nA sua TAG será desbloqueada em até 3 horas após a confirmação do pagamento, juntamente com a cobrança da mensalidade ativa, conforme o seu plano.\n\nAtenção: utilize o botão "copia e cola" enviado abaixo ou realize o pagamento pelo SuperApp Sem Parar. Não realize transferência direta para o CNPJ informado, pois isso poderá impedir a identificação automática do pagamento.'
                    }
                ]
            },
            {
                id: 'oferta-data-vencimento',
                title: 'Oferta de Data de Vencimento',
                category: 'Negociação',
                observation: 'A Duda deve apresentar inicialmente a data de vencimento da proposta como D+1 (um dia após a data atual). Caso o cliente informe que não consegue realizar o pagamento nessa data, deverá oferecer outras datas disponíveis no sistema. Se o cliente solicitar uma data específica, a assistente deverá verificar sua disponibilidade e, caso não esteja habilitada, informar as alternativas permitidas, respeitando o período disponível para negociação. Após a escolha do cliente, deverá confirmar a data selecionada e prosseguir com a formalização do acordo.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação padrão Sem Parar',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'APRESENTAÇÃO DA DATA INICIAL',
                        condition: 'Após apresentar a data D+1, aguardar a confirmação do cliente. Se aceitar, prosseguir com a formalização. Se informar que não consegue pagar nessa data, avançar para a oferta de uma nova data.',
                        speech: 'O vencimento da sua proposta é [DD/MM].'
                    },
                    {
                        title: 'CLIENTE NÃO CONSEGUE PAGAR NA DATA OFERTADA',
                        condition: 'Quando o cliente informar que não consegue realizar o pagamento na data inicial (D-1), a Duda deverá oferecer uma nova data correspondente a D+3. Se o cliente aceitar, avançar para a confirmação do vencimento. Caso não aceite, aguardar uma contraproposta de data e verificar se está dentro do período permitido pelo sistema.',
                        speech: 'Entendi! Posso oferecer o pagamento para [DD/MM]. Essa data funciona para você?'
                    },
                    {
                        title: 'CLIENTE SOLICITA OUTRA DATA',
                        condition: 'Consultar se a data solicitada pelo cliente está dentro do prazo permitido para negociação (D+5). Se estiver disponível, confirmar a data. Caso contrário, informar que não é possível selecionar essa data e avançar para a apresentação das alternativas disponíveis.',
                        speech: 'Entendi, mas o dia [DD/MM] não está disponível. Você pode escolher entre [DATA_INICIAL] e [DATA_FINAL]. Fechando hoje, o valor de [VALOR] tem desconto aplicado, e o pagamento restabelece seu relacionamento com o Sem Parar. Qual dessas datas funciona melhor para você?'
                    },
                    {
                        title: 'CLIENTE NÃO ACEITA AS DATAS DISPONÍVEIS',
                        condition: 'Quando o cliente informar que não consegue realizar o pagamento nas datas disponíveis, apresentar as opções alternativas de pagamento por boleto ou cartão de crédito. Caso escolha uma das opções, direcionar para o fluxo correspondente. Caso não tenha interesse, avançar para a finalização.',
                        speech: 'Também posso fazer essa proposta por boleto ou cartão de crédito. Qual forma de pagamento você prefere?'
                    },
                    {
                        title: 'CLIENTE NÃO DESEJA NEGOCIAR',
                        condition: 'Quando o cliente recusar as alternativas de pagamento e informar que não deseja prosseguir com a negociação, registrar a recusa e finalizar o atendimento, sem insistir em novas ofertas.',
                        speech: 'Tudo bem. Vou registrar no sistema que você não quer fazer um acordo agora. Se mudar de ideia, é só falar com o Sem Parar pelos canais oficiais: 4002 1552 (capitais e regiões metropolitanas) ou 0800 015 02 52 (demais localidades), atendimento 24 horas. Até mais!'
                    }
                ]
            },
            {
                id: 'acordo-parcelado',
                title: 'Acordo Parcelado',
                category: 'Negociação',
                observation: 'O parcelamento só é ofertado em caso de recusa do pagamento à vista, ou caso o cliente solicite a simulação. A Tag só desbloqueia após quitação total.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação de titularidade',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'CONTEXTUALIZAÇÃO DA FATURA (PARCELADO)',
                        condition: 'Cliente recusou à vista ou pediu parcelamento',
                        speech: 'Para pagamento em [X] parcelas, a entrada fica em R$ [VALOR], com vencimento em [DD/MM/AAAA], e as duas parcelas seguintes ficam em R$ [VALOR] cada, nos meses seguintes, totalizando R$ [VALOR]. O pagamento será no PIX.\n\nPodemos seguir com essa condição?'
                    },
                    {
                        title: 'CONFIRMAÇÃO EM DUAS ETAPAS',
                        condition: 'Cliente aceita a simulação parcelada',
                        speech: 'A condição fica em [X] parcelas no PIX: entrada de R$ [VALOR], com vencimento em [DD/MM], e mais duas parcelas de R$ [VALOR] cada. Posso registrar o acordo nessas condições?'
                    },
                    {
                        title: 'ENVIO DO PIX + INSTRUÇÕES DE PAGAMENTO',
                        condition: 'Cliente confirma o registro do parcelamento',
                        speech: 'Pronto! Seu acordo foi formalizado com sucesso no valor de R$ [VALOR], com vencimento em [DD/MM].\n\nAntes de finalizar o pagamento, confira se o beneficiário é Sem Parar instituição de pagamento Ltda e verifique se todos os dados apresentados estão corretos.\n\nA sua TAG será desbloqueada somente após a quitação total do acordo parcelado, juntamente com a cobrança da mensalidade ativa, conforme o seu plano.\n\nAtenção: utilize o botão "copia e cola" enviado abaixo ou realize o pagamento pelo SuperApp Sem Parar. Não realize transferência direta para o CNPJ informado, pois isso poderá impedir a identificação automática do pagamento.'
                    }
                ]
            },
            {
                id: 'pagamento-cartao-credito',
                title: 'Pagamento com Cartão de Crédito',
                category: 'Negociação',
                observation: 'Quando o cliente solicitar pagamento via cartão de crédito, a Duda deverá apresentar a proposta à vista com desconto e a data de vencimento. Após o aceite, confirmar as condições, registrar o acordo e orientar o cliente sobre o pagamento pelo SuperApp Sem Parar, incluindo o passo a passo. Informar que, após a confirmação do pagamento, a TAG será desbloqueada em até 6 horas.\n\nPonto de atenção: A Duda não deve solicitar dados do cartão durante a conversa. O pagamento e a escolha das parcelas devem ser realizados exclusivamente pelo cliente no SuperApp Sem Parar. A mensalidade seguirá conforme o plano ativo.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação padrão Sem Parar',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'OFERTA À VISTA – CARTÃO DE CRÉDITO',
                        condition: 'Quando o cliente demonstrar interesse em pagar via cartão de crédito, apresentar o valor com desconto e a data de vencimento. Caso aceite, avançar para a confirmação do acordo. Caso recuse, retornar ao fluxo de negociação.',
                        speech: 'O pagamento à vista, com desconto, fica em [VALOR], via cartão, até [DD/MM]. Podemos seguir com essa condição?'
                    },
                    {
                        title: 'CONFIRMAÇÃO DO ACORDO – CARTÃO DE CRÉDITO',
                        condition: 'Após o aceite do cliente, registrar o acordo e avançar para a orientação de pagamento. Caso não aceite, retornar ao fluxo de negociação.',
                        speech: 'Vou registrar o acordo no cartão de crédito, com vencimento em [DD/MM]. O pagamento e a escolha das parcelas são feitos pelo SuperApp Sem Parar. Posso registrar o acordo nessas condições?'
                    },
                    {
                        title: 'FORMALIZAÇÃO E ORIENTAÇÃO DE PAGAMENTO',
                        condition: 'Após a formalização do acordo, apresentar as instruções para pagamento pelo SuperApp. Orientar o cliente sobre a conferência dos dados e informar o prazo de desbloqueio da TAG após a confirmação do pagamento.',
                        speech: 'Pronto! Seu acordo foi formalizado com sucesso no valor de [VALOR], com vencimento em [DD/MM].\n\nPara realizar o pagamento pelo SuperApp Sem Parar:\n\n1º - abra o SuperApp Sem Parar.\n2º - faça login na sua conta.\n3º - acesse o menu pagamentos.\n4º - selecione a fatura referente ao acordo.\n5º - escolha cartão de crédito.\n6º - informe os dados do cartão e confirme se o beneficiário aparece como Sem Parar instituição de pagamento Ltda e se os dados do acordo estão corretos.\n7º - finalize o pagamento.\n\nApós a confirmação do pagamento, sua TAG será desbloqueada em até 6 horas e estará pronta para uso. A cobrança da mensalidade seguirá conforme o plano ativo em sua conta.\n\nPara mais informações, acesse o SuperApp Sem Parar ou entre em contato pelo telefone 0800 888 6166.'
                    }
                ]
            },
            {
                id: 'pagamento-boleto',
                title: 'Pagamento via Boleto',
                category: 'Negociação',
                observation: 'Quando o cliente solicitar pagamento via boleto, a Duda deverá apresentar o valor da proposta à vista com desconto e a data de vencimento. Após o aceite, confirmar as condições e solicitar a segunda confirmação para registrar o acordo. Após a formalização, disponibilizar o código de barras ou a linha digitável do boleto e orientar o cliente sobre a conferência dos dados do beneficiário e do pagamento. Informar que a TAG será desbloqueada em até 2 dias após a confirmação do pagamento.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação padrão Sem Parar',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'OFERTA À VISTA – BOLETO',
                        condition: 'Quando o cliente solicitar pagamento via boleto, apresentar o valor da proposta com desconto e a data de vencimento. Caso aceite, avançar para a segunda confirmação. Caso recuse, retornar ao fluxo de negociação.',
                        speech: 'O pagamento à vista, com desconto, fica em [VALOR], via boleto, até [DD/MM]. Podemos seguir com essa condição?'
                    },
                    {
                        title: 'CONFIRMAÇÃO DO ACORDO – BOLETO',
                        condition: 'Solicitar uma segunda confirmação do cliente antes de registrar o acordo. Após o aceite, avançar para a formalização. Caso não aceite, retornar ao fluxo de negociação, sem formalizar o acordo.',
                        speech: 'Combinado. Vou registrar o acordo à vista, no valor de [VALOR], com vencimento em [DD/MM], no boleto. Posso registrar o acordo nessas condições?'
                    },
                    {
                        title: 'ACORDO FORMALIZADO – BOLETO',
                        condition: 'Após a segunda confirmação positiva, formalizar o acordo, disponibilizar o código de barras ou a linha digitável e orientar sobre as condições de pagamento. Informar o prazo de desbloqueio da TAG de até 2 dias após a confirmação do pagamento.',
                        speech: 'Acordo realizado, você consegue copiar o código de barras pelo botão abaixo.\n\nPronto! Seu acordo foi formalizado com sucesso no valor de [VALOR], com vencimento em [DD/MM].\n\nAntes de finalizar o pagamento, confira se o beneficiário é Sem Parar instituição de pagamento Ltda e verifique se todos os dados apresentados estão corretos.\n\nA sua TAG será desbloqueada em até 2 dias após a confirmação do pagamento, juntamente com a cobrança da mensalidade ativa, conforme o seu plano.\n\n🚨 atenção: pague usando a linha digitável do boleto enviado ou pelo SuperApp Sem Parar. Não realize transferência direta para o CNPJ informado, pois isso poderá impedir a identificação automática do pagamento.'
                    }
                ]
            },
            {
                id: 'preventivo',
                title: 'Preventivo (Acordo Vigente)',
                category: 'Preventivo / Acordo',
                observation: 'Acionado quando o cliente já possui um acordo ativo dentro do prazo de vencimento e precisa da 2ª via do código PIX.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'CONTEXTUALIZAÇÃO DO ACORDO',
                        condition: 'Sistema identifica acordo ativo em aberto',
                        speech: 'Você tem um acordo em aberto de R$ [VALOR], à vista, com vencimento em [DD/MM]. Você recebeu os dados para pagamento do acordo?'
                    },
                    {
                        title: 'CONFIRMAÇÃO DO ENVIO',
                        condition: 'Cliente informa que não recebeu ou pede reenvio',
                        speech: 'É importante pagar até [DD/MM] para não perder o desconto aplicado. Vou reenviar os dados para pagamento pelo WhatsApp. Posso enviar agora?'
                    },
                    {
                        title: 'ENVIO DO PIX + INSTRUÇÕES DE PAGAMENTO',
                        condition: 'Cliente confirma reenvio',
                        speech: 'Pronto! Enviei os dados para pagamento do seu acordo.\n\nAtenção: utilize o botão "copia e cola" enviado ou realize o pagamento pelo SuperApp Sem Parar. Não realize transferência direta para o CNPJ informado, pois isso poderá impedir a identificação automática do pagamento.\n\nA sua TAG será desbloqueada em até 3 horas após a confirmação do pagamento, juntamente com a cobrança da mensalidade ativa, conforme o seu plano.\n\nConfira se o beneficiário é Sem Parar instituição de pagamento Ltda antes de pagar. Até mais!'
                    }
                ]
            },
            {
                id: 'recusa-negociacao',
                title: 'Recusa de Negociação',
                category: 'Negociação',
                observation: 'Quando o cliente recusar uma negociação, a Duda deverá verificar se há interesse em outra condição, realizando até 3 tentativas. Caso mantenha a recusa após as três tentativas, deverá registrar a recusa no sistema, informar os canais oficiais do Sem Parar e encerrar o atendimento cordialmente, sem insistir em novas ofertas.\n\nImportante: contabilizar cada recusa efetiva. Se o cliente aceitar qualquer condição durante as tentativas, interromper a contagem e direcioná-lo ao fluxo de negociação correspondente.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação padrão Sem Parar',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'PRIMEIRA RECUSA - BENEFÍCIOS SEM PARAR',
                        condition: 'Quando o cliente recusar a primeira oferta de acordo, apresentar os benefícios do Sem Parar e perguntar novamente se deseja conhecer a condição de regularização. Caso aceite, retornar à etapa de apresentação da proposta. Caso recuse novamente, avançar para a segunda tentativa de negociação.',
                        speech: 'Entendo. Regularizar a fatura em aberto também ajuda a manter o acesso aos benefícios do Sem Parar:\n\n🚗 pedágios: passe pelas rodovias com mais comodidade, sem precisar parar para pagar.\n\n🅿️ estacionamentos: mais facilidade e agilidade ao acessar estacionamentos parceiros.\n\n⛽ abastecimento: use o Sem Parar em postos parceiros e torne seus pagamentos mais simples.\n\nPosso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'SEGUNDA RECUSA - REFORÇO DOS BENEFÍCIOS',
                        condition: 'Quando o cliente recusar novamente a proposta, apresentar os demais benefícios do Sem Parar e realizar uma nova tentativa de negociação. Caso aceite, retornar à apresentação da proposta. Caso apresente a terceira recusa, avançar para a oferta de parcelamento.',
                        speech: '🍔 drive-thru: mais praticidade e rapidez em estabelecimentos parceiros.\n\n🧼 lava-rápidos: pagamento direto pela TAG, sem dinheiro ou cartão.\n\n🛣️ mobilidade completa: diversas soluções em um único serviço, mais conforto no dia a dia.\n\nPosso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'TERCEIRA RECUSA - OFERTA DE PARCELAMENTO',
                        condition: 'Quando o cliente recusar a terceira tentativa de negociação à vista, apresentar a opção de parcelamento disponível no sistema. Caso aceite, avançar para a formalização do acordo. Caso recuse novamente, avançar para a finalização do atendimento.',
                        speech: 'Para pagamento em [QUANTIDADE_PARCELAS] parcelas, a entrada fica em [VALOR_ENTRADA], com vencimento em [DD/MM], e as [QUANTIDADE_PARCELAS_RESTANTES] parcelas seguintes ficam em [VALOR_PARCELA] cada, nos meses seguintes, totalizando [VALOR_TOTAL]. O pagamento será no PIX. Podemos seguir com essa condição?'
                    },
                    {
                        title: 'QUARTA RECUSA - FINALIZAÇÃO DO ATENDIMENTO',
                        condition: 'Quando o cliente recusar também a oferta de parcelamento, registrar a recusa no sistema e finalizar o atendimento, sem apresentar novas ofertas ou insistir na negociação.',
                        speech: 'Tudo bem. Vou registrar no sistema que você não quer fazer um acordo agora. Se mudar de ideia, é só falar com o Sem Parar pelos canais oficiais: 4002 1552 (capitais e regiões metropolitanas) ou 0800 015 02 52 (demais localidades), atendimento 24 horas. Até mais!'
                    }
                ]
            },
            {
                id: 'quebra-acordo',
                title: 'Quebra de Acordo Vigente',
                category: 'Preventivo / Acordo',
                observation: 'Após o cliente aceitar a quebra do acordo, o cliente volta ao fluxo de negociação onde pode simular o vencimento à prazo ou até mesmo um parcelamento.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'CONTEXTUALIZAÇÃO DO ACORDO',
                        condition: 'Identificado acordo vigente',
                        speech: 'Você tem um acordo em aberto de R$ [VALOR], à vista, com vencimento em [DD/MM]. Você recebeu os dados para pagamento do acordo?'
                    },
                    {
                        title: 'CANCELAMENTO DO ACORDO',
                        condition: 'Cliente solicita nova data ou nova condição',
                        speech: 'Para fazer uma nova negociação, preciso cancelar o acordo atual. Posso cancelar o acordo atual?'
                    },
                    {
                        title: 'ENVIO DE NOVA PROPOSTA',
                        condition: 'Cliente autoriza cancelamento do acordo anterior',
                        speech: 'O acordo anterior foi cancelado. Para quitar a fatura em aberto, a nova proposta é de R$ [VALOR] à vista, com vencimento em [DD/MM]. Podemos seguir com essa condição?'
                    },
                    {
                        title: 'ENVIO DO PIX + INSTRUÇÕES DE PAGAMENTO',
                        condition: 'Cliente aceita a nova proposta',
                        speech: 'Pronto! Enviei os dados para pagamento do seu acordo.\n\nAtenção: utilize o botão "copia e cola" enviado ou realize o pagamento pelo SuperApp Sem Parar. Não realize transferência direta para o CNPJ informado, pois isso poderá impedir a identificação automática do pagamento.'
                    }
                ]
            },
            {
                id: 'alega-pagamento-menor-5',
                title: 'Alega Pagamento (< 5 dias úteis)',
                category: 'Alegação de Pagamento',
                observation: 'Cenário onde o pagamento foi feito recentemente e ainda está dentro da janela de compensação bancária de 5 dias úteis. Encerra sem transbordo.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'CONTEXTUALIZAÇÃO DA FATURA',
                        condition: 'Apresentação da dívida ativa no sistema',
                        speech: 'Pronto! Consta [X] faturas em atraso, no valor de R$ [VALOR]. O vencimento foi em [DD/MM/AA], totalizando [X] dias de atraso.\n\nConsegui uma condição especial para facilitar a quitação:\nR$ [VALOR] à vista com desconto.\n\nPosso enviar essa proposta?'
                    },
                    {
                        title: 'CONFIRMAÇÃO DO PAGAMENTO',
                        condition: 'Cliente responde informando que já pagou',
                        speech: 'Entendi. Você fez o pagamento nos últimos cinco dias úteis?'
                    },
                    {
                        title: 'INSTRUÇÕES DA BAIXA DE PAGAMENTO',
                        condition: 'Cliente confirma que pagou há menos de 5 dias úteis',
                        speech: 'O processamento do pagamento pode levar até 5 dias úteis. Você pode acompanhar pelo SuperApp Sem Parar, na seção \'finanças\' ou \'fatura\'. Assim que constar como regularizado, estará tudo certo. Obrigada pelo contato e até mais!'
                    }
                ]
            },
            {
                id: 'alega-pagamento-maior-5',
                title: 'Alega Pagamento (> 5 dias úteis / Transbordo)',
                category: 'Alegação de Pagamento',
                observation: 'Quando o cliente informa uma data específica ou pagamento fora do prazo padrão de baixa, o Bot encaminha para verificação humana (ATH).',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'CONTEXTUALIZAÇÃO DA FATURA',
                        condition: 'Apresentação da dívida',
                        speech: 'Pronto! Consta [X] faturas em atraso, no valor de R$ [VALOR]. O vencimento foi em [DD/MM/AA], totalizando [X] dias de atraso.\n\nConsegui uma condição especial para facilitar a quitação:\nR$ [VALOR] à vista com desconto.\n\nPosso enviar essa proposta?'
                    },
                    {
                        title: 'CONFIRMAÇÃO DO PAGAMENTO',
                        condition: 'Cliente alega pagamento já efetuado',
                        speech: 'Entendi. Você fez o pagamento nos últimos cinco dias úteis?'
                    },
                    {
                        title: 'ENCAMINHAMENTO PARA VERIFICAÇÃO (FILA ATH)',
                        condition: 'Cliente informa data anterior a 5 dias úteis (ex: 30 de outubro)',
                        speech: 'Vou encaminhar seu atendimento para verificarem o pagamento realizado em [DATA INFORMADA] e ajudarem você com a fatura em aberto.\n\nOlá! Tudo bem? Você está na fila de espera para atendimento. Por favor, aguarde um momento e logo estaremos com você.'
                    }
                ]
            },
            {
                id: 'transferencia-ath',
                title: 'Transferência para ATH (Retenção)',
                category: 'Encerramento / Transbordo',
                observation: 'O cliente só é transferido para um ATH após a segunda solicitação por parte do cliente. Na primeira ele faz uma retenção para o cliente permanecer no atendimento com o Bot.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'CONTEXTUALIZAÇÃO DA FATURA',
                        condition: 'Apresentação da oferta',
                        speech: 'Pronto! Consta [X] faturas em atraso, no valor de R$ [VALOR]. O vencimento foi em [DD/MM/AA], totalizando [X] dias de atraso.\n\nConsegui uma condição especial para facilitar a quitação:\nR$ [VALOR] à vista com desconto.\n\nPosso enviar essa proposta?'
                    },
                    {
                        title: 'RETENÇÃO NO ATENDIMENTO (1º Pedido de Humano)',
                        condition: 'Cliente pede para falar com atendente pela 1ª vez',
                        speech: 'Consigo ajudar com a maioria dos assuntos por aqui. Posso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'TRANSFERÊNCIA PARA ATENDENTE HUMANO (2º Pedido)',
                        condition: 'Cliente insiste em falar com humano pela 2ª vez',
                        speech: 'Certo, vou transferir você para uma pessoa da equipe.\n\nOlá! Tudo bem? Você está na fila de espera para atendimento. Por favor, aguarde um momento e logo estaremos com você.'
                    }
                ]
            },
            {
                id: 'falecimento',
                title: 'Falecimento do Titular',
                category: 'Encerramento / Transbordo',
                observation: 'Encerramento imediato com empatia e registro no sistema sem ofertar cobrança.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'FINALIZAÇÃO COM EMPATIA',
                        condition: 'Interlocutor informa falecimento do titular',
                        speech: 'Sinto muito pela sua perda. Vou registrar essa informação no sistema e encerrar o atendimento por aqui. Meus sentimentos a você e à família.'
                    }
                ]
            },
            {
                id: 'desconhece',
                title: 'Desconhece o Titular',
                category: 'Encerramento / Transbordo',
                observation: 'Encerramento imediato por terceiros / número errado.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação + Validação',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'FINALIZAÇÃO COM EMPATIA',
                        condition: 'Pessoa informa não conhecer o titular',
                        speech: 'Entendi. Como você não reconhece o titular, vou encerrar o atendimento por aqui. Até mais!'
                    }
                ]
            },
            {
                id: 'contestacao',
                title: 'Cenários de Contestação e Retenção',
                category: 'Contestação / Retenção',
                observation: 'O objetivo do Bot é sempre realizar a retenção do cliente, sem que haja a necessidade da transferência para um ATH (exceto se não reconhecer a cobrança).',
                steps: [
                    {
                        title: 'CENÁRIO A: CLIENTE ALEGA QUE JÁ FEZ O CANCELAMENTO',
                        condition: 'Contorno de objeção + Retomada de oferta',
                        speech: 'Entendi. O cancelamento do serviço não interfere nas faturas geradas enquanto o contrato estava ativo. A fatura em aberto permanece vinculada ao seu CPF e está disponível para regularização.\n\nPosso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'CENÁRIO B: CLIENTE ALEGA QUE QUER CANCELAR',
                        condition: 'Argumentação de benefícios + Direcionamento',
                        speech: 'Entendo seu pedido. Com o Sem Parar, você tem mais comodidade nos pedágios, sem precisar parar para pagar. Também pode acessar estacionamentos parceiros com mais facilidade.\n\nO cancelamento do serviço é feito exclusivamente pela central de atendimento. Por aqui, posso ajudar com a regularização da fatura em aberto. A condição atual é de R$ [VALOR], com vencimento em [DD/MM].\n\nPosso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'CENÁRIO C: CLIENTE ALEGA QUE NÃO USOU O SERVIÇO (1ª vez)',
                        condition: 'Reforço de vínculo contratual',
                        speech: 'Entendo. Ainda assim, a fatura em aberto consta vinculada ao seu CPF no sistema.\n\nPosso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'CENÁRIO D: NÃO RECONHECE A COBRANÇA (Transbordo ATH)',
                        condition: 'Cliente insiste que não reconhece a fatura/serviço',
                        speech: 'Entendo que você não reconhece essa fatura em aberto. Vou encaminhar seu atendimento para uma pessoa da equipe verificar essa cobrança com você.\n\nOlá! Tudo bem? Você está na fila de espera para atendimento. Por favor, aguarde um momento e logo estaremos com você.'
                    }
                ]
            },
            {
                id: 'mensagens-fora-contexto',
                title: 'Tratamento de Mensagens Fora do Contexto',
                category: 'Geral',
                observation: 'Quando o cliente enviar mensagens que não estejam relacionadas à negociação, a Duda deverá responder de forma cordial, reforçar que o canal é exclusivo para regularização de débitos e direcionar novamente a conversa para a proposta de negociação. A assistente deverá realizar até 3 tentativas de redirecionamento. Caso o cliente continue enviando mensagens fora do contexto após a terceira tentativa, deverá encerrar o atendimento de forma cordial, sem perder o contexto da negociação ou realizar ofertas indevidas.',
                steps: [
                    {
                        title: 'CONFIRMAÇÃO INICIAL',
                        condition: 'Saudação padrão Sem Parar',
                        speech: 'Oi, tudo bem? Eu sou a Duda, da equipe do Sem Parar. Pra gente seguir, preciso que você confirme o seu CPF ou CNPJ completo, por favor.'
                    },
                    {
                        title: 'PRIMEIRA TENTATIVA - FORA DO CONTEXTO',
                        condition: 'Quando o cliente enviar uma mensagem fora do contexto de negociação pela primeira vez, apresentar a resposta acima e retomar a oferta. Caso envie outra mensagem fora do contexto, avançar para a segunda tentativa.',
                        speech: 'Entendo, essa mudança de temperatura pode ser bem desconfortável. Este canal é dedicado à negociação. Assim que a fatura em aberto for quitada, você poderá resolver outros assuntos pelo SuperApp Sem Parar ou pela central de atendimento. Posso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'SEGUNDA TENTATIVA - FORA DO CONTEXTO',
                        condition: 'Quando o cliente insistir em assuntos fora do contexto pela segunda vez, apresentar a resposta acima e realizar nova tentativa de direcionamento. Caso envie outra mensagem fora do contexto, avançar para a terceira tentativa.',
                        speech: 'Entendo sua curiosidade. Como já comentei, este canal é só para negociação. Depois que a fatura em aberto for quitada, você poderá resolver outros assuntos pelo SuperApp Sem Parar ou pela central de atendimento. Posso te mostrar de novo a condição para regularizar a sua fatura?'
                    },
                    {
                        title: 'SOLICITAÇÃO DE ALTERAÇÃO DE VALORES OU PAGAMENTO',
                        condition: 'Quando o cliente solicitar alteração do saldo, zerar valores ou registrar um pagamento não realizado, informar que não é possível executar essas ações. Manter os valores originais registrados no sistema e orientar o cliente caso informe que já realizou o pagamento.',
                        speech: 'Não consigo alterar o valor ou registrar um pagamento que não foi feito. Se você já pagou a fatura em aberto, me avise para eu te orientar.'
                    },
                    {
                        title: 'TERCEIRA TENTATIVA - FINALIZAÇÃO POR DESVIO',
                        condition: 'Quando o cliente continuar enviando mensagens fora do contexto após as tentativas de redirecionamento, realizar o encerramento do atendimento, registrando o motivo da finalização.',
                        speech: 'Como este canal é só para negociação, vou encerrar o atendimento por aqui. Entraremos em contato em outro momento.'
                    }
                ]
            }
        ];

        // ESTADO DA APLICAÇÃO
        const storedFlows = JSON.parse(localStorage.getItem('semparar_bot_flows'));
        let flows = storedFlows || JSON.parse(JSON.stringify(defaultFlows));

        if (storedFlows) {
            let updatedStoredFlows = false;

            defaultFlows.forEach((defaultFlow, index) => {
                const matchesFlow = flow => flow.id === defaultFlow.id || flow.title === defaultFlow.title;
                const existingFlowIndex = flows.findIndex(matchesFlow);
                if (existingFlowIndex !== -1) {
                    const existingFlow = flows[existingFlowIndex];
                    const pendingStepCount = {
                        'oferta-data-vencimento': 6,
                        'recusa-negociacao': 5,
                        'mensagens-fora-contexto': 5,
                        'pagamento-cartao-credito': 4,
                        'pagamento-boleto': 4
                    }[defaultFlow.id];
                    const isPendingScenario = pendingStepCount
                        && existingFlow.observation === 'Conteúdo das etapas pendente de preenchimento.'
                        && existingFlow.steps.length === pendingStepCount
                        && existingFlow.steps.every((step, stepIndex) =>
                            step.title === `ETAPA ${stepIndex + 1} - CONTEÚDO PENDENTE`
                            && step.condition === 'Conteúdo desta etapa pendente de definição.'
                            && step.speech === 'Conteúdo pendente de preenchimento.'
                        );

                    if (isPendingScenario) {
                        flows[existingFlowIndex] = {
                            ...existingFlow,
                            category: defaultFlow.category,
                            observation: defaultFlow.observation,
                            steps: JSON.parse(JSON.stringify(defaultFlow.steps))
                        };
                        updatedStoredFlows = true;
                    }
                    return;
                }

                const nextDefaultFlow = defaultFlows.slice(index + 1).find(nextFlow =>
                    flows.some(flow => flow.id === nextFlow.id || flow.title === nextFlow.title)
                );
                const insertIndex = nextDefaultFlow
                    ? flows.findIndex(flow => flow.id === nextDefaultFlow.id || flow.title === nextDefaultFlow.title)
                    : flows.length;

                flows.splice(insertIndex, 0, JSON.parse(JSON.stringify(defaultFlow)));
                updatedStoredFlows = true;
            });

            if (updatedStoredFlows) {
                localStorage.setItem('semparar_bot_flows', JSON.stringify(flows));
            }
        }

        let currentFlowId = flows[0]?.id || null;

        // NUMERAÇÃO SEQUENCIAL AUTOMÁTICA
        function getFormattedFlowTitle(flow, index) {
            const cleanTitle = flow.title.replace(/^\d+\.\s*/, '');
            return `${index + 1}. ${cleanTitle}`;
        }

        // FORMATAÇÃO DE VARIÁVEIS NA FALA
        function formatSpeech(text) {
            let escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return escaped.replace(/(\[.*?\])/g, '<span class="var-highlight">$1</span>').replace(/\n/g, '<br>');
        }

        // RENDERIZAR SIDEBAR
        function renderSidebar() {
            const list = document.getElementById('flowList');
            const query = document.getElementById('searchInput').value.toLowerCase();
            list.innerHTML = '';

            flows.forEach((flow, index) => {
                const numberedTitle = getFormattedFlowTitle(flow, index);
                const matchTitle = numberedTitle.toLowerCase().includes(query);
                const matchSpeech = flow.steps.some(s => s.speech.toLowerCase().includes(query) || s.title.toLowerCase().includes(query));
                
                if (matchTitle || matchSpeech) {
                    const isActive = flow.id === currentFlowId;
                    const btn = document.createElement('div');
                    btn.onclick = () => { currentFlowId = flow.id; renderAll(); };
                    btn.className = `w-full cursor-pointer text-left px-3 py-2.5 rounded-lg text-sm transition flex items-center justify-between ${
                        isActive ? 'bg-rose-600 text-white font-semibold shadow' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`;
                    btn.innerHTML = `
                        <span class="truncate pr-2 flex-1">${numberedTitle}</span>
                        <span class="text-xs px-1.5 py-0.5 rounded ${isActive ? 'bg-rose-700 text-rose-100' : 'bg-slate-800 text-slate-400'}">${flow.steps.length}</span>
                    `;
                    list.appendChild(btn);
                }
            });
        }

        // RENDERIZAR FLUXO PRINCIPAL
        function renderMain() {
            const flowIndex = flows.findIndex(f => f.id === currentFlowId);
            const flow = flows[flowIndex];
            if (!flow) return;

            document.getElementById('flowTitle').innerText = getFormattedFlowTitle(flow, flowIndex);
            document.getElementById('flowCategoryBadge').innerText = flow.category || 'Geral';
            document.getElementById('stepCountBadge').innerText = `${flow.steps.length} etapa(s)`;

            const obsBox = document.getElementById('observationBox');
            if (flow.observation && flow.observation.trim() !== '') {
                obsBox.classList.remove('hidden');
                document.getElementById('observationText').innerText = flow.observation;
            } else {
                obsBox.classList.add('hidden');
            }

            const container = document.getElementById('stepsContainer');
            container.innerHTML = '';

            flow.steps.forEach((step, index) => {
                const stepEl = document.createElement('div');
                stepEl.className = 'flow-step relative flex gap-4';
                stepEl.innerHTML = `
                    <div class="flow-connector relative flex-shrink-0">
                        <div class="w-10 h-10 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center shadow-md z-10 relative border-4 border-slate-100">
                            ${index + 1}
                        </div>
                    </div>

                    <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
                        <div class="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h3 class="font-bold text-sm text-slate-800 tracking-wide">${step.title}</h3>
                                ${step.condition ? `<p class="text-xs text-slate-500 mt-0.5"><i class="fas fa-code-branch text-rose-500 mr-1"></i> ${step.condition}</p>` : ''}
                            </div>
                            <button onclick="copySpeech(${index})" class="px-2.5 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md transition flex items-center gap-1" title="Copiar fala da Duda">
                                <i class="far fa-copy"></i> Copiar Fala
                            </button>
                        </div>

                        <div class="p-5 bg-white">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-1">
                                    <i class="fas fa-robot text-sm"></i>
                                </div>
                                <div class="flex-1 bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-4 text-sm text-slate-700 leading-relaxed">
                                    ${formatSpeech(step.speech)}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(stepEl);
            });
        }

        function renderAll() {
            renderSidebar();
            renderMain();
        }

        function copySpeech(stepIndex) {
            const flow = flows.find(f => f.id === currentFlowId);
            const text = flow.steps[stepIndex].speech;
            navigator.clipboard.writeText(text).then(() => {
                showToast('Fala da Duda copiada para a área de transferência!');
            });
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMsg').innerText = msg;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 2500);
        }

        renderAll();
