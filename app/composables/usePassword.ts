// Password Validation Function used in Reset Password or Change Password Sections
export function useResetPasswordValidation(password: Ref<string>) {
  const lowercaseValid = ref(false)
  const uppercaseValid = ref(false)
  const numberValid = ref(false)
  const lengthValid = ref(false)

  watch(
    () => password.value,
    (newPassword) => {
      lowercaseValid.value = passwordHasLowercase(newPassword)
      uppercaseValid.value = passwordHasUppercase(newPassword)
      numberValid.value = passwordHasNumber(newPassword)
      lengthValid.value = passwordIsValidPasswordLength(newPassword)
    },
  )

  const getValidationClass: Ref<any> = computed(() => {
    const validCount = [
      lowercaseValid,
      uppercaseValid,
      numberValid,
      lengthValid,
    ].filter(ref => ref.value).length

    switch (validCount) {
      case 0:
        return 'bg-muted w-0'
      case 1:
        return 'bg-warning w-1/4'
      case 2:
        return 'bg-yellow-500 dark:bg-yellow-400 w-2/4'
      case 3:
        return 'bg-blue-500 dark:bg-blue-400 w-3/4'
      case 4:
        return 'bg-success w-full'
      default:
        return ''
    }
  })

  return {
    lowercaseValid,
    uppercaseValid,
    numberValid,
    lengthValid,
    getValidationClass,
  }
}
