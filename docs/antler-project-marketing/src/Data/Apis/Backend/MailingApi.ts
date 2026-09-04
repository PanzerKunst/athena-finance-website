import { config } from "../../../config.ts"

export async function subscribeToMailingList(email: string): Promise<void> {
  const result = await fetch(`${config.BACKEND_URL}/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })

  if (!result.ok) {
    throw new Error("Error while adding email to list")
  }
}
