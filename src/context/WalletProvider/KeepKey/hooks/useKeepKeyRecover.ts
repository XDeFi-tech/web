import { useToast } from '@chakra-ui/react'
import { RecoverDevice } from '@shapeshiftoss/hdwallet-core'
import { useTranslate } from 'react-polyglot'
import { parseIntToEntropy } from 'context/WalletProvider/KeepKey/helpers'
import { useWallet } from 'hooks/useWallet/useWallet'
import { logger } from 'lib/logger'
const moduleLogger = logger.child({ namespace: ['useKeepKeyRecover'] })

export const useKeepKeyRecover = () => {
  const {
    setDeviceState,
    state: {
      deviceState: { recoverWithPassphrase, recoveryEntropy },
      wallet,
    },
  } = useWallet()
  const toast = useToast()
  const translate = useTranslate()

  const recoverKeepKey = async (label: string | undefined) => {
    setDeviceState({ awaitingDeviceInteraction: true })
    const recoverParams: RecoverDevice = {
      entropy: parseIntToEntropy(recoveryEntropy),
      label: label ?? '',
      passphrase: recoverWithPassphrase || false,
      pin: true,
      autoLockDelayMs: 600000, // Ten minutes
    }
    await wallet?.recover(recoverParams).catch(e => {
      moduleLogger.error(e)
      toast({
        title: translate('common.error'),
        description: e?.message ?? translate('common.somethingWentWrong'),
        status: 'error',
        isClosable: true,
      })
    })
  }

  return recoverKeepKey
}
