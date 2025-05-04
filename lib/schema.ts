// This file defines the database schema for the application
// It can be used with Prisma or as a reference for Supabase tables

export const schema = {
  // Users table
  users: {
    id: 'uuid primary key',
    email: 'text unique not null',
    username: 'text unique not null',
    password_hash: 'text not null',
    full_name: 'text',
    avatar_url: 'text',
    wallet_address: 'text',
    balance: 'decimal default 0',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()',
    last_login: 'timestamp with time zone',
    role: 'text default user', // user, admin, moderator
    is_verified: 'boolean default false',
    preferences: 'jsonb', // user preferences like notifications, theme, etc.
    language: 'text default en'
  },

  // Sports table
  sports: {
    id: 'uuid primary key',
    name: 'text not null',
    slug: 'text unique not null',
    icon: 'text',
    active: 'boolean default true',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Teams table
  teams: {
    id: 'uuid primary key',
    name: 'text not null',
    short_name: 'text not null',
    logo_url: 'text',
    sport_id: 'uuid references sports(id)',
    country: 'text',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Players table
  players: {
    id: 'uuid primary key',
    name: 'text not null',
    team_id: 'uuid references teams(id)',
    position: 'text',
    jersey_number: 'integer',
    stats: 'jsonb',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Games/Matches table
  games: {
    id: 'uuid primary key',
    sport_id: 'uuid references sports(id)',
    home_team_id: 'uuid references teams(id)',
    away_team_id: 'uuid references teams(id)',
    start_time: 'timestamp with time zone not null',
    end_time: 'timestamp with time zone',
    status: 'text default scheduled', // scheduled, live, finished, cancelled
    home_score: 'integer default 0',
    away_score: 'integer default 0',
    stats: 'jsonb',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Betting markets table
  markets: {
    id: 'uuid primary key',
    game_id: 'uuid references games(id)',
    name: 'text not null', // moneyline, spread, over/under, etc.
    description: 'text',
    status: 'text default open', // open, closed, settled
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Odds table
  odds: {
    id: 'uuid primary key',
    market_id: 'uuid references markets(id)',
    selection: 'text not null', // team name, over, under, etc.
    price: 'decimal not null', // American odds format
    probability: 'decimal', // Implied probability
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Bets table
  bets: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    market_id: 'uuid references markets(id)',
    odds_id: 'uuid references odds(id)',
    amount: 'decimal not null',
    potential_payout: 'decimal not null',
    status: 'text default pending', // pending, won, lost, void, cash_out
    placed_at: 'timestamp with time zone default now()',
    settled_at: 'timestamp with time zone',
    transaction_id: 'text', // blockchain transaction ID
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Parlays table
  parlays: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    name: 'text',
    amount: 'decimal not null',
    potential_payout: 'decimal not null',
    status: 'text default pending', // pending, won, lost, partial, void
    placed_at: 'timestamp with time zone default now()',
    settled_at: 'timestamp with time zone',
    transaction_id: 'text', // blockchain transaction ID
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Parlay legs table
  parlay_legs: {
    id: 'uuid primary key',
    parlay_id: 'uuid references parlays(id)',
    bet_id: 'uuid references bets(id)',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Bots table
  bots: {
    id: 'uuid primary key',
    name: 'text not null',
    description: 'text',
    creator_id: 'uuid references users(id)',
    sport_id: 'uuid references sports(id)',
    algorithm: 'text',
    parameters: 'jsonb',
    performance: 'jsonb', // win rate, ROI, etc.
    status: 'text default active', // active, paused, archived
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Bot predictions table
  bot_predictions: {
    id: 'uuid primary key',
    bot_id: 'uuid references bots(id)',
    game_id: 'uuid references games(id)',
    market_id: 'uuid references markets(id)',
    prediction: 'text not null',
    confidence: 'decimal',
    reasoning: 'text',
    result: 'text', // correct, incorrect, void
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Bot subscriptions table
  bot_subscriptions: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    bot_id: 'uuid references bots(id)',
    status: 'text default active', // active, paused, cancelled
    start_date: 'timestamp with time zone default now()',
    end_date: 'timestamp with time zone',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Transactions table
  transactions: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    amount: 'decimal not null',
    type: 'text not null', // deposit, withdrawal, bet, win, loss, refund
    status: 'text default pending', // pending, completed, failed
    blockchain_tx: 'text', // blockchain transaction ID
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Fantasy contests table
  fantasy_contests: {
    id: 'uuid primary key',
    name: 'text not null',
    description: 'text',
    sport_id: 'uuid references sports(id)',
    entry_fee: 'decimal not null',
    prize_pool: 'decimal not null',
    max_entries: 'integer',
    start_time: 'timestamp with time zone not null',
    end_time: 'timestamp with time zone not null',
    status: 'text default scheduled', // scheduled, live, completed, cancelled
    scoring_rules: 'jsonb not null',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Fantasy lineups table
  fantasy_lineups: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    contest_id: 'uuid references fantasy_contests(id)',
    name: 'text',
    score: 'decimal default 0',
    status: 'text default active', // active, submitted, disqualified
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Fantasy lineup players table
  fantasy_lineup_players: {
    id: 'uuid primary key',
    lineup_id: 'uuid references fantasy_lineups(id)',
    player_id: 'uuid references players(id)',
    position: 'text not null',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Promotions table
  promotions: {
    id: 'uuid primary key',
    name: 'text not null',
    description: 'text',
    type: 'text not null', // deposit bonus, free bet, cashback, etc.
    amount: 'decimal',
    percentage: 'decimal',
    min_deposit: 'decimal',
    max_bonus: 'decimal',
    wagering_requirement: 'decimal',
    start_date: 'timestamp with time zone not null',
    end_date: 'timestamp with time zone not null',
    status: 'text default active', // active, expired, cancelled
    terms: 'text',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // User promotions table
  user_promotions: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    promotion_id: 'uuid references promotions(id)',
    status: 'text default active', // active, used, expired
    claimed_at: 'timestamp with time zone',
    used_at: 'timestamp with time zone',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Notifications table
  notifications: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    type: 'text not null', // bet_result, promotion, system, etc.
    title: 'text not null',
    message: 'text not null',
    read: 'boolean default false',
    data: 'jsonb', // additional data for the notification
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // User sessions table
  user_sessions: {
    id: 'uuid primary key',
    user_id: 'uuid references users(id)',
    token: 'text not null',
    ip_address: 'text',
    user_agent: 'text',
    expires_at: 'timestamp with time zone not null',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  },

  // Chat messages table
  chat_messages: {
    id: 'uuid primary key',
    sender_id: 'uuid references users(id)',
    receiver_id: 'uuid references users(id)',
    message: 'text not null',
    read: 'boolean default false',
    created_at: 'timestamp with time zone default now()',
    updated_at: 'timestamp with time zone default now()'
  }
}
