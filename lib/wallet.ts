import { Connection, PublicKey, Keypair } from "@solana/web3.js"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Solana connection
const connection = new Connection(process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com", "confirmed")

// Treasury wallet (to be set from environment variables)
const treasuryPublicKey = new PublicKey(process.env.TREASURY_PUBLIC_KEY || "")

// Function to generate a random keypair (for demo purposes only)
function generateRandomKeypair(): Uint8Array {
  const keypair = Keypair.generate()
  return keypair.publicKey.toBytes()
}

export async function getUserWallet(userId: string) {
  const { data, error } = await supabase.from("wallets").select("*").eq("user_id", userId).single()

  if (error) {
    console.error("Error fetching wallet:", error)
    return null
  }

  return data
}

export async function createUserWallet(userId: string) {
  // Check if wallet already exists
  const existingWallet = await getUserWallet(userId)
  if (existingWallet) return existingWallet

  // Generate a new wallet address (in a real implementation, this would be more secure)
  // For demo purposes, we're just creating a random public key
  const walletAddress = new PublicKey(generateRandomKeypair()).toString()

  const { data, error } = await supabase
    .from("wallets")
    .insert([
      {
        user_id: userId,
        balance: 0,
        address: walletAddress,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating wallet:", error)
    return null
  }

  return data
}

export async function depositToWallet(userId: string, amount: number) {
  const wallet = await getUserWallet(userId)
  if (!wallet) return { success: false, message: "Wallet not found" }

  // In a real implementation, this would involve actual blockchain transactions
  // For demo purposes, we're just updating the database
  const { error } = await supabase
    .from("wallets")
    .update({ balance: wallet.balance + amount })
    .eq("user_id", userId)

  if (error) {
    console.error("Error depositing to wallet:", error)
    return { success: false, message: "Deposit failed" }
  }

  // Record the transaction
  const { error: txError } = await supabase.from("transactions").insert([
    {
      wallet_id: wallet.id,
      amount,
      type: "deposit",
      status: "completed",
      description: "Deposit to wallet",
    },
  ])

  if (txError) {
    console.error("Error recording transaction:", txError)
  }

  return { success: true, message: `Successfully deposited ${amount} SOL` }
}

export async function withdrawFromWallet(userId: string, amount: number) {
  const wallet = await getUserWallet(userId)
  if (!wallet) return { success: false, message: "Wallet not found" }

  if (wallet.balance < amount) {
    return { success: false, message: "Insufficient balance" }
  }

  // In a real implementation, this would involve actual blockchain transactions
  // For demo purposes, we're just updating the database
  const { error } = await supabase
    .from("wallets")
    .update({ balance: wallet.balance - amount })
    .eq("user_id", userId)

  if (error) {
    console.error("Error withdrawing from wallet:", error)
    return { success: false, message: "Withdrawal failed" }
  }

  // Record the transaction
  const { error: txError } = await supabase.from("transactions").insert([
    {
      wallet_id: wallet.id,
      amount: -amount,
      type: "withdrawal",
      status: "completed",
      description: "Withdrawal from wallet",
    },
  ])

  if (txError) {
    console.error("Error recording transaction:", txError)
  }

  return { success: true, message: `Successfully withdrew ${amount} SOL` }
}

export async function placeBet(userId: string, betAmount: number, potentialPayout: number, outcomes: any[]) {
  const wallet = await getUserWallet(userId)
  if (!wallet) return { success: false, message: 'Wallet not found' }

  if (wallet.balance < betAmount) {
    return { success: false, message: 'Insufficient balance' }
  }

  // Start a transaction
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { success: false, message: 'Authentication required' }

  // Deduct the bet amount from the wallet
  const { error: walletError } = await supabase
    .from('wallets')
    .update({ balance: wallet.balance - betAmount })
    .eq('user_id', userId)

  if (walletError) {
    console.error('Error updating wallet balance:', walletError)
    return { success: false, message: 'Failed to place bet' }
  }

  // Create the bet record
  const { data: bet, error: betError } = await supabase
    .from('bets')
    .insert([
      {
        user_id: userId,
        amount: betAmount,
        potential_payout: potentialPayout,
        status: 'pending',
        is_parlay: outcomes.length > 1,
      },
    ])
    .select()
    .single()

  if (betError || !bet) {
    console.error('Error creating bet:', betError)
    // Rollback the wallet update
    await supabase\
      .from('wal
