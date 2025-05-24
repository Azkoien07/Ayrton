import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Category {
  Desarrollo = 'Desarrollo',
  Eficiencia = 'Eficiencia',
  Productividad = 'Productividad'
}

export type Challenge = {
  __typename?: 'Challenge';
  category: Category;
  description: Scalars['String']['output'];
  dificulty: Dificulty;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  state: Scalars['Boolean']['output'];
};

export type ChallengeInput = {
  category: Category;
  description: Scalars['String']['input'];
  dificulty: Dificulty;
  name: Scalars['String']['input'];
  state: Scalars['Boolean']['input'];
};

export type ChallengePage = {
  __typename?: 'ChallengePage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Challenge>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type ChallengePageId = {
  __typename?: 'ChallengePageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Challenge>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ChallengeUpdateInput = {
  category: Category;
  description: Scalars['String']['input'];
  dificulty: Dificulty;
  name: Scalars['String']['input'];
  state: Scalars['Boolean']['input'];
};

export enum Dificulty {
  Alta = 'Alta',
  Baja = 'Baja',
  Intermedia = 'Intermedia'
}

export type Mutation = {
  __typename?: 'Mutation';
  addChallenge?: Maybe<Response>;
  addPayment?: Maybe<Response>;
  addPlan?: Maybe<Response>;
  addPqr?: Maybe<Response>;
  addRanking?: Maybe<Response>;
  addRole?: Maybe<Response>;
  addTask?: Maybe<Response>;
  addUser?: Maybe<Response>;
  addVoucher?: Maybe<Response>;
  deleteChallenge?: Maybe<Response>;
  deletePayment?: Maybe<Response>;
  deletePlan?: Maybe<Response>;
  deletePqr?: Maybe<Response>;
  deleteRanking?: Maybe<Response>;
  deleteRole?: Maybe<Response>;
  deleteTask?: Maybe<Response>;
  deleteUser?: Maybe<Response>;
  deleteVoucher?: Maybe<Response>;
  updateChallenge?: Maybe<Response>;
  updatePayment?: Maybe<Response>;
  updatePlan?: Maybe<Response>;
  updatePqr?: Maybe<Response>;
  updateRanking?: Maybe<Response>;
  updateRole?: Maybe<Response>;
  updateTask?: Maybe<Response>;
  updateUser?: Maybe<Response>;
  updateVoucher?: Maybe<Response>;
};


export type MutationAddChallengeArgs = {
  input?: InputMaybe<ChallengeInput>;
};


export type MutationAddPaymentArgs = {
  input?: InputMaybe<PaymentInput>;
};


export type MutationAddPlanArgs = {
  input?: InputMaybe<PlanInput>;
};


export type MutationAddPqrArgs = {
  input?: InputMaybe<PqrInput>;
};


export type MutationAddRankingArgs = {
  input?: InputMaybe<RankingInput>;
};


export type MutationAddRoleArgs = {
  input?: InputMaybe<RoleInput>;
};


export type MutationAddTaskArgs = {
  input?: InputMaybe<TaskInput>;
};


export type MutationAddUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationAddVoucherArgs = {
  input?: InputMaybe<VoucherInput>;
};


export type MutationDeleteChallengeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePaymentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePlanArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePqrArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRankingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVoucherArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateChallengeArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<ChallengeUpdateInput>;
};


export type MutationUpdatePaymentArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<PaymentUpdateInput>;
};


export type MutationUpdatePlanArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<PlanUpdateInput>;
};


export type MutationUpdatePqrArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<PqrUpdateInput>;
};


export type MutationUpdateRankingArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<RankingUpdateInput>;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<RoleUpdateInput>;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<TaskUpdateInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UserUpdateInput>;
};


export type MutationUpdateVoucherArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<VoucherUpdateInput>;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID']['output'];
  paymentMethod: PaymentMethod;
  purchaseAmount: Scalars['Float']['output'];
};

export type PaymentInput = {
  paymentMethod: PaymentMethod;
  purchaseAmount: Scalars['Float']['input'];
};

export enum PaymentMethod {
  Paypal = 'Paypal',
  TarjetaCredito = 'TarjetaCredito',
  TarjetaDebito = 'TarjetaDebito'
}

export type PaymentPage = {
  __typename?: 'PaymentPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Payment>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PaymentPageId = {
  __typename?: 'PaymentPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Payment>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type PaymentUpdateInput = {
  paymentMethod: PaymentMethod;
  purchaseAmount: Scalars['Float']['input'];
};

export type Plan = {
  __typename?: 'Plan';
  description: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  state: Scalars['Boolean']['output'];
};

export type PlanInput = {
  description: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  state: Scalars['Boolean']['input'];
};

export type PlanPage = {
  __typename?: 'PlanPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Plan>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PlanPageId = {
  __typename?: 'PlanPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Plan>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type PlanUpdateInput = {
  description: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  state: Scalars['Boolean']['input'];
};

export type Pqr = {
  __typename?: 'Pqr';
  answer: Scalars['String']['output'];
  argument: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  state: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  typePqr: TypePqr;
};

export type PqrInput = {
  answer: Scalars['String']['input'];
  argument: Scalars['String']['input'];
  description: Scalars['String']['input'];
  state: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  typePqr: TypePqr;
};

export type PqrPage = {
  __typename?: 'PqrPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Pqr>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PqrPageId = {
  __typename?: 'PqrPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Pqr>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type PqrUpdateInput = {
  answer: Scalars['String']['input'];
  argument: Scalars['String']['input'];
  description: Scalars['String']['input'];
  state: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  typePqr: TypePqr;
};

export enum Priority {
  Alta = 'Alta',
  Baja = 'Baja',
  Media = 'Media'
}

export type Query = {
  __typename?: 'Query';
  allChallenges?: Maybe<ChallengePage>;
  allPayments?: Maybe<PaymentPage>;
  allPlans?: Maybe<PlanPage>;
  allPqrs?: Maybe<PqrPage>;
  allRankings?: Maybe<RankingPage>;
  allRoles?: Maybe<RolePage>;
  allTasks?: Maybe<TaskPage>;
  allUsers?: Maybe<UserPage>;
  allVouchers?: Maybe<VoucherPage>;
  challengeById?: Maybe<ChallengePageId>;
  paymentById?: Maybe<PaymentPageId>;
  planById?: Maybe<PlanPageId>;
  pqrById?: Maybe<PqrPageId>;
  rankingById?: Maybe<RankingPageId>;
  roleById?: Maybe<RolePageId>;
  taskById?: Maybe<TaskPageId>;
  userById?: Maybe<UserPageId>;
  voucherById?: Maybe<VoucherPageId>;
};


export type QueryAllChallengesArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllPaymentsArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllPlansArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllPqrsArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllRankingsArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllRolesArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllTasksArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllUsersArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryAllVouchersArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryChallengeByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlanByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPqrByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRankingByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVoucherByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Ranking = {
  __typename?: 'Ranking';
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
};

export type RankingInput = {
  level: Scalars['Int']['input'];
  position: Scalars['Int']['input'];
};

export type RankingPage = {
  __typename?: 'RankingPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Ranking>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type RankingPageId = {
  __typename?: 'RankingPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Ranking>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type RankingUpdateInput = {
  level: Scalars['Int']['input'];
  position: Scalars['Int']['input'];
};

export type Response = {
  __typename?: 'Response';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Role = {
  __typename?: 'Role';
  accessLevel: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type RoleInput = {
  accessLevel: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type RolePage = {
  __typename?: 'RolePage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Role>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type RolePageId = {
  __typename?: 'RolePageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Role>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type RoleUpdateInput = {
  accessLevel: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  description: Scalars['String']['output'];
  fCreation: Scalars['String']['output'];
  fExpiration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  priority: Priority;
  reminder?: Maybe<Scalars['String']['output']>;
  state: Scalars['Boolean']['output'];
  typeTask: TypeTask;
};

export type TaskInput = {
  description: Scalars['String']['input'];
  fCreation: Scalars['String']['input'];
  fExpiration: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority: Priority;
  reminder?: InputMaybe<Scalars['String']['input']>;
  state: Scalars['Boolean']['input'];
  typeTask: TypeTask;
};

export type TaskPage = {
  __typename?: 'TaskPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Task>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type TaskPageId = {
  __typename?: 'TaskPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Task>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type TaskUpdateInput = {
  description: Scalars['String']['input'];
  fCreation: Scalars['String']['input'];
  fExpiration: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority: Priority;
  reminder?: InputMaybe<Scalars['String']['input']>;
  state: Scalars['Boolean']['input'];
  typeTask: TypeTask;
};

export enum TypePqr {
  Peticion = 'Peticion',
  Queja = 'Queja',
  Reclamo = 'Reclamo'
}

export enum TypeTask {
  Educativa = 'Educativa',
  Laboral = 'Laboral',
  Personal = 'Personal'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserPage = {
  __typename?: 'UserPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<User>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type UserPageId = {
  __typename?: 'UserPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<User>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type UserUpdateInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Voucher = {
  __typename?: 'Voucher';
  code: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  payment: Payment;
};

export type VoucherInput = {
  code: Scalars['String']['input'];
  paymentId: Scalars['ID']['input'];
};

export type VoucherPage = {
  __typename?: 'VoucherPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Voucher>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type VoucherPageId = {
  __typename?: 'VoucherPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Voucher>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type VoucherUpdateInput = {
  code: Scalars['String']['input'];
  paymentId: Scalars['ID']['input'];
};

export type AddChallengeMutationVariables = Exact<{
  input: ChallengeInput;
}>;


export type AddChallengeMutation = { __typename?: 'Mutation', addChallenge?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeleteChallengeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteChallengeMutation = { __typename?: 'Mutation', deleteChallenge?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdateChallengeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ChallengeUpdateInput;
}>;


export type UpdateChallengeMutation = { __typename?: 'Mutation', updateChallenge?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetChallengesQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetChallengesQuery = { __typename?: 'Query', allChallenges?: { __typename?: 'ChallengePage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Challenge', id: string, name: string, description: string, category: Category, state: boolean, dificulty: Dificulty } | null> | null } | null };

export type GetChallengeByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetChallengeByIdQuery = { __typename?: 'Query', challengeById?: { __typename?: 'ChallengePageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Challenge', id: string, name: string, description: string, category: Category, state: boolean, dificulty: Dificulty } | null } | null };

export type AddPaymentMutationVariables = Exact<{
  input: PaymentInput;
}>;


export type AddPaymentMutation = { __typename?: 'Mutation', addPayment?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeletePaymentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePaymentMutation = { __typename?: 'Mutation', deletePayment?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdatePaymentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: PaymentUpdateInput;
}>;


export type UpdatePaymentMutation = { __typename?: 'Mutation', updatePayment?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetPaymentsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetPaymentsQuery = { __typename?: 'Query', allPayments?: { __typename?: 'PaymentPage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Payment', id: string, purchaseAmount: number, paymentMethod: PaymentMethod } | null> | null } | null };

export type PaymentByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PaymentByIdQuery = { __typename?: 'Query', paymentById?: { __typename?: 'PaymentPageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Payment', id: string, purchaseAmount: number, paymentMethod: PaymentMethod } | null } | null };

export type AddPlanMutationVariables = Exact<{
  input: PlanInput;
}>;


export type AddPlanMutation = { __typename?: 'Mutation', addPlan?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeletePlanMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdatePlanMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: PlanUpdateInput;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetPlansQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetPlansQuery = { __typename?: 'Query', allPlans?: { __typename?: 'PlanPage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Plan', id: string, name: string, description: string, price: number, state: boolean, duration: number } | null> | null } | null };

export type GetPlanByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPlanByIdQuery = { __typename?: 'Query', planById?: { __typename?: 'PlanPageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Plan', id: string, name: string, description: string, price: number, state: boolean, duration: number } | null } | null };

export type AddPqrMutationVariables = Exact<{
  input: PqrInput;
}>;


export type AddPqrMutation = { __typename?: 'Mutation', addPqr?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeletePqrMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePqrMutation = { __typename?: 'Mutation', deletePqr?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdatePqrMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: PqrUpdateInput;
}>;


export type UpdatePqrMutation = { __typename?: 'Mutation', updatePqr?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetPqrsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetPqrsQuery = { __typename?: 'Query', allPqrs?: { __typename?: 'PqrPage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Pqr', id: string, typePqr: TypePqr, title: string, description: string, argument: string, answer: string, state: boolean } | null> | null } | null };

export type GetPqrByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPqrByIdQuery = { __typename?: 'Query', pqrById?: { __typename?: 'PqrPageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Pqr', id: string, typePqr: TypePqr, title: string, description: string, argument: string, answer: string, state: boolean } | null } | null };

export type AddRankingMutationVariables = Exact<{
  input: RankingInput;
}>;


export type AddRankingMutation = { __typename?: 'Mutation', addRanking?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeleteRankingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRankingMutation = { __typename?: 'Mutation', deleteRanking?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdateRankingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: RankingUpdateInput;
}>;


export type UpdateRankingMutation = { __typename?: 'Mutation', updateRanking?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetRankingsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetRankingsQuery = { __typename?: 'Query', allRankings?: { __typename?: 'RankingPage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Ranking', id: string, level: number, position: number } | null> | null } | null };

export type GetRankingByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRankingByIdQuery = { __typename?: 'Query', rankingById?: { __typename?: 'RankingPageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Ranking', id: string, level: number, position: number } | null } | null };

export type AddRoleMutationVariables = Exact<{
  input: RoleInput;
}>;


export type AddRoleMutation = { __typename?: 'Mutation', addRole?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: RoleUpdateInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetRolesQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetRolesQuery = { __typename?: 'Query', allRoles?: { __typename?: 'RolePage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Role', id: string, name: string, accessLevel: number } | null> | null } | null };

export type GetRoleByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoleByIdQuery = { __typename?: 'Query', roleById?: { __typename?: 'RolePageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Role', id: string, name: string, accessLevel: number } | null } | null };

export type AddTaskMutationVariables = Exact<{
  input: TaskInput;
}>;


export type AddTaskMutation = { __typename?: 'Mutation', addTask?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: TaskUpdateInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetTasksQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetTasksQuery = { __typename?: 'Query', allTasks?: { __typename?: 'TaskPage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Task', id: string, name: string, description: string, priority: Priority, typeTask: TypeTask, state: boolean, fCreation: string, fExpiration: string, reminder?: string | null } | null> | null } | null };

export type GetTaskByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTaskByIdQuery = { __typename?: 'Query', taskById?: { __typename?: 'TaskPageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Task', id: string, name: string, description: string, priority: Priority, typeTask: TypeTask, state: boolean, fCreation: string, fExpiration: string, reminder?: string | null } | null } | null };

export type AddUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetUsersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetUsersQuery = { __typename?: 'Query', allUsers?: { __typename?: 'UserPage', code?: string | null, date?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'User', id: string, name: string, email: string, username: string } | null> | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'UserPageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'User', id: string, name: string, email: string, username: string } | null } | null };

export type AddVoucherMutationVariables = Exact<{
  input: VoucherInput;
}>;


export type AddVoucherMutation = { __typename?: 'Mutation', addVoucher?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type DeleteVoucherMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVoucherMutation = { __typename?: 'Mutation', deleteVoucher?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type UpdateVoucherMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: VoucherUpdateInput;
}>;


export type UpdateVoucherMutation = { __typename?: 'Mutation', updateVoucher?: { __typename?: 'Response', code?: string | null, message?: string | null, date?: string | null, data?: string | null } | null };

export type GetVouchersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetVouchersQuery = { __typename?: 'Query', allVouchers?: { __typename?: 'VoucherPage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Voucher', id?: string | null, code: string, payment: { __typename?: 'Payment', id: string, purchaseAmount: number, paymentMethod: PaymentMethod } } | null> | null } | null };

export type GetVoucherByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetVoucherByIdQuery = { __typename?: 'Query', voucherById?: { __typename?: 'VoucherPageId', date?: string | null, code?: string | null, message?: string | null, data?: { __typename?: 'Voucher', id?: string | null, code: string, payment: { __typename?: 'Payment', id: string, purchaseAmount: number, paymentMethod: PaymentMethod } } | null } | null };


export const AddChallengeDocument = gql`
    mutation AddChallenge($input: ChallengeInput!) {
  addChallenge(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddChallengeMutationFn = Apollo.MutationFunction<AddChallengeMutation, AddChallengeMutationVariables>;

/**
 * __useAddChallengeMutation__
 *
 * To run a mutation, you first call `useAddChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChallengeMutation, { data, loading, error }] = useAddChallengeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddChallengeMutation(baseOptions?: Apollo.MutationHookOptions<AddChallengeMutation, AddChallengeMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddChallengeMutation, AddChallengeMutationVariables>(AddChallengeDocument, options);
}
export type AddChallengeMutationHookResult = ReturnType<typeof useAddChallengeMutation>;
export type AddChallengeMutationResult = Apollo.MutationResult<AddChallengeMutation>;
export type AddChallengeMutationOptions = Apollo.BaseMutationOptions<AddChallengeMutation, AddChallengeMutationVariables>;
export const DeleteChallengeDocument = gql`
    mutation DeleteChallenge($id: ID!) {
  deleteChallenge(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeleteChallengeMutationFn = Apollo.MutationFunction<DeleteChallengeMutation, DeleteChallengeMutationVariables>;

/**
 * __useDeleteChallengeMutation__
 *
 * To run a mutation, you first call `useDeleteChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChallengeMutation, { data, loading, error }] = useDeleteChallengeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteChallengeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChallengeMutation, DeleteChallengeMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteChallengeMutation, DeleteChallengeMutationVariables>(DeleteChallengeDocument, options);
}
export type DeleteChallengeMutationHookResult = ReturnType<typeof useDeleteChallengeMutation>;
export type DeleteChallengeMutationResult = Apollo.MutationResult<DeleteChallengeMutation>;
export type DeleteChallengeMutationOptions = Apollo.BaseMutationOptions<DeleteChallengeMutation, DeleteChallengeMutationVariables>;
export const UpdateChallengeDocument = gql`
    mutation UpdateChallenge($id: ID!, $input: ChallengeUpdateInput!) {
  updateChallenge(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdateChallengeMutationFn = Apollo.MutationFunction<UpdateChallengeMutation, UpdateChallengeMutationVariables>;

/**
 * __useUpdateChallengeMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeMutation, { data, loading, error }] = useUpdateChallengeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChallengeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChallengeMutation, UpdateChallengeMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateChallengeMutation, UpdateChallengeMutationVariables>(UpdateChallengeDocument, options);
}
export type UpdateChallengeMutationHookResult = ReturnType<typeof useUpdateChallengeMutation>;
export type UpdateChallengeMutationResult = Apollo.MutationResult<UpdateChallengeMutation>;
export type UpdateChallengeMutationOptions = Apollo.BaseMutationOptions<UpdateChallengeMutation, UpdateChallengeMutationVariables>;
export const GetChallengesDocument = gql`
    query GetChallenges($page: Int!, $size: Int!) {
  allChallenges(page: $page, size: $size) {
    code
    data {
      id
      name
      description
      category
      state
      dificulty
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetChallengesQuery__
 *
 * To run a query within a React component, call `useGetChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetChallengesQuery(baseOptions: Apollo.QueryHookOptions<GetChallengesQuery, GetChallengesQueryVariables> & ({ variables: GetChallengesQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetChallengesQuery, GetChallengesQueryVariables>(GetChallengesDocument, options);
}
export function useGetChallengesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChallengesQuery, GetChallengesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetChallengesQuery, GetChallengesQueryVariables>(GetChallengesDocument, options);
}
export function useGetChallengesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChallengesQuery, GetChallengesQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetChallengesQuery, GetChallengesQueryVariables>(GetChallengesDocument, options);
}
export type GetChallengesQueryHookResult = ReturnType<typeof useGetChallengesQuery>;
export type GetChallengesLazyQueryHookResult = ReturnType<typeof useGetChallengesLazyQuery>;
export type GetChallengesSuspenseQueryHookResult = ReturnType<typeof useGetChallengesSuspenseQuery>;
export type GetChallengesQueryResult = Apollo.QueryResult<GetChallengesQuery, GetChallengesQueryVariables>;
export const GetChallengeByIdDocument = gql`
    query GetChallengeById($id: ID!) {
  challengeById(id: $id) {
    data {
      id
      name
      description
      category
      state
      dificulty
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetChallengeByIdQuery__
 *
 * To run a query within a React component, call `useGetChallengeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChallengeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetChallengeByIdQuery, GetChallengeByIdQueryVariables> & ({ variables: GetChallengeByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>(GetChallengeByIdDocument, options);
}
export function useGetChallengeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>(GetChallengeByIdDocument, options);
}
export function useGetChallengeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>(GetChallengeByIdDocument, options);
}
export type GetChallengeByIdQueryHookResult = ReturnType<typeof useGetChallengeByIdQuery>;
export type GetChallengeByIdLazyQueryHookResult = ReturnType<typeof useGetChallengeByIdLazyQuery>;
export type GetChallengeByIdSuspenseQueryHookResult = ReturnType<typeof useGetChallengeByIdSuspenseQuery>;
export type GetChallengeByIdQueryResult = Apollo.QueryResult<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>;
export const AddPaymentDocument = gql`
    mutation AddPayment($input: PaymentInput!) {
  addPayment(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddPaymentMutationFn = Apollo.MutationFunction<AddPaymentMutation, AddPaymentMutationVariables>;

/**
 * __useAddPaymentMutation__
 *
 * To run a mutation, you first call `useAddPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMutation, { data, loading, error }] = useAddPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPaymentMutation(baseOptions?: Apollo.MutationHookOptions<AddPaymentMutation, AddPaymentMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddPaymentMutation, AddPaymentMutationVariables>(AddPaymentDocument, options);
}
export type AddPaymentMutationHookResult = ReturnType<typeof useAddPaymentMutation>;
export type AddPaymentMutationResult = Apollo.MutationResult<AddPaymentMutation>;
export type AddPaymentMutationOptions = Apollo.BaseMutationOptions<AddPaymentMutation, AddPaymentMutationVariables>;
export const DeletePaymentDocument = gql`
    mutation DeletePayment($id: ID!) {
  deletePayment(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeletePaymentMutationFn = Apollo.MutationFunction<DeletePaymentMutation, DeletePaymentMutationVariables>;

/**
 * __useDeletePaymentMutation__
 *
 * To run a mutation, you first call `useDeletePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePaymentMutation, { data, loading, error }] = useDeletePaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePaymentMutation(baseOptions?: Apollo.MutationHookOptions<DeletePaymentMutation, DeletePaymentMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePaymentMutation, DeletePaymentMutationVariables>(DeletePaymentDocument, options);
}
export type DeletePaymentMutationHookResult = ReturnType<typeof useDeletePaymentMutation>;
export type DeletePaymentMutationResult = Apollo.MutationResult<DeletePaymentMutation>;
export type DeletePaymentMutationOptions = Apollo.BaseMutationOptions<DeletePaymentMutation, DeletePaymentMutationVariables>;
export const UpdatePaymentDocument = gql`
    mutation UpdatePayment($id: ID!, $input: PaymentUpdateInput!) {
  updatePayment(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdatePaymentMutationFn = Apollo.MutationFunction<UpdatePaymentMutation, UpdatePaymentMutationVariables>;

/**
 * __useUpdatePaymentMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentMutation, { data, loading, error }] = useUpdatePaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePaymentMutation, UpdatePaymentMutationVariables>(UpdatePaymentDocument, options);
}
export type UpdatePaymentMutationHookResult = ReturnType<typeof useUpdatePaymentMutation>;
export type UpdatePaymentMutationResult = Apollo.MutationResult<UpdatePaymentMutation>;
export type UpdatePaymentMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>;
export const GetPaymentsDocument = gql`
    query GetPayments($page: Int!, $size: Int!) {
  allPayments(page: $page, size: $size) {
    code
    data {
      id
      purchaseAmount
      paymentMethod
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetPaymentsQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables> & ({ variables: GetPaymentsQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
}
export function useGetPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
}
export function useGetPaymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
}
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>;
export type GetPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsSuspenseQuery>;
export type GetPaymentsQueryResult = Apollo.QueryResult<GetPaymentsQuery, GetPaymentsQueryVariables>;
export const PaymentByIdDocument = gql`
    query paymentById($id: ID!) {
  paymentById(id: $id) {
    data {
      id
      purchaseAmount
      paymentMethod
    }
    date
    code
    message
  }
}
    `;

/**
 * __usePaymentByIdQuery__
 *
 * To run a query within a React component, call `usePaymentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePaymentByIdQuery(baseOptions: Apollo.QueryHookOptions<PaymentByIdQuery, PaymentByIdQueryVariables> & ({ variables: PaymentByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PaymentByIdQuery, PaymentByIdQueryVariables>(PaymentByIdDocument, options);
}
export function usePaymentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentByIdQuery, PaymentByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PaymentByIdQuery, PaymentByIdQueryVariables>(PaymentByIdDocument, options);
}
export function usePaymentByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PaymentByIdQuery, PaymentByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<PaymentByIdQuery, PaymentByIdQueryVariables>(PaymentByIdDocument, options);
}
export type PaymentByIdQueryHookResult = ReturnType<typeof usePaymentByIdQuery>;
export type PaymentByIdLazyQueryHookResult = ReturnType<typeof usePaymentByIdLazyQuery>;
export type PaymentByIdSuspenseQueryHookResult = ReturnType<typeof usePaymentByIdSuspenseQuery>;
export type PaymentByIdQueryResult = Apollo.QueryResult<PaymentByIdQuery, PaymentByIdQueryVariables>;
export const AddPlanDocument = gql`
    mutation AddPlan($input: PlanInput!) {
  addPlan(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddPlanMutationFn = Apollo.MutationFunction<AddPlanMutation, AddPlanMutationVariables>;

/**
 * __useAddPlanMutation__
 *
 * To run a mutation, you first call `useAddPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPlanMutation, { data, loading, error }] = useAddPlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPlanMutation(baseOptions?: Apollo.MutationHookOptions<AddPlanMutation, AddPlanMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddPlanMutation, AddPlanMutationVariables>(AddPlanDocument, options);
}
export type AddPlanMutationHookResult = ReturnType<typeof useAddPlanMutation>;
export type AddPlanMutationResult = Apollo.MutationResult<AddPlanMutation>;
export type AddPlanMutationOptions = Apollo.BaseMutationOptions<AddPlanMutation, AddPlanMutationVariables>;
export const DeletePlanDocument = gql`
    mutation DeletePlan($id: ID!) {
  deletePlan(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeletePlanMutationFn = Apollo.MutationFunction<DeletePlanMutation, DeletePlanMutationVariables>;

/**
 * __useDeletePlanMutation__
 *
 * To run a mutation, you first call `useDeletePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlanMutation, { data, loading, error }] = useDeletePlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlanMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlanMutation, DeletePlanMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePlanMutation, DeletePlanMutationVariables>(DeletePlanDocument, options);
}
export type DeletePlanMutationHookResult = ReturnType<typeof useDeletePlanMutation>;
export type DeletePlanMutationResult = Apollo.MutationResult<DeletePlanMutation>;
export type DeletePlanMutationOptions = Apollo.BaseMutationOptions<DeletePlanMutation, DeletePlanMutationVariables>;
export const UpdatePlanDocument = gql`
    mutation UpdatePlan($id: ID!, $input: PlanUpdateInput!) {
  updatePlan(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdatePlanMutationFn = Apollo.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;

/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePlanMutation, UpdatePlanMutationVariables>(UpdatePlanDocument, options);
}
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const GetPlansDocument = gql`
    query GetPlans($page: Int!, $size: Int!) {
  allPlans(page: $page, size: $size) {
    code
    data {
      id
      name
      description
      price
      state
      duration
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetPlansQuery__
 *
 * To run a query within a React component, call `useGetPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlansQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetPlansQuery(baseOptions: Apollo.QueryHookOptions<GetPlansQuery, GetPlansQueryVariables> & ({ variables: GetPlansQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
}
export function useGetPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
}
export function useGetPlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
}
export type GetPlansQueryHookResult = ReturnType<typeof useGetPlansQuery>;
export type GetPlansLazyQueryHookResult = ReturnType<typeof useGetPlansLazyQuery>;
export type GetPlansSuspenseQueryHookResult = ReturnType<typeof useGetPlansSuspenseQuery>;
export type GetPlansQueryResult = Apollo.QueryResult<GetPlansQuery, GetPlansQueryVariables>;
export const GetPlanByIdDocument = gql`
    query GetPlanById($id: ID!) {
  planById(id: $id) {
    data {
      id
      name
      description
      price
      state
      duration
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetPlanByIdQuery__
 *
 * To run a query within a React component, call `useGetPlanByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlanByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPlanByIdQuery, GetPlanByIdQueryVariables> & ({ variables: GetPlanByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPlanByIdQuery, GetPlanByIdQueryVariables>(GetPlanByIdDocument, options);
}
export function useGetPlanByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlanByIdQuery, GetPlanByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPlanByIdQuery, GetPlanByIdQueryVariables>(GetPlanByIdDocument, options);
}
export function useGetPlanByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlanByIdQuery, GetPlanByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPlanByIdQuery, GetPlanByIdQueryVariables>(GetPlanByIdDocument, options);
}
export type GetPlanByIdQueryHookResult = ReturnType<typeof useGetPlanByIdQuery>;
export type GetPlanByIdLazyQueryHookResult = ReturnType<typeof useGetPlanByIdLazyQuery>;
export type GetPlanByIdSuspenseQueryHookResult = ReturnType<typeof useGetPlanByIdSuspenseQuery>;
export type GetPlanByIdQueryResult = Apollo.QueryResult<GetPlanByIdQuery, GetPlanByIdQueryVariables>;
export const AddPqrDocument = gql`
    mutation AddPqr($input: PqrInput!) {
  addPqr(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddPqrMutationFn = Apollo.MutationFunction<AddPqrMutation, AddPqrMutationVariables>;

/**
 * __useAddPqrMutation__
 *
 * To run a mutation, you first call `useAddPqrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPqrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPqrMutation, { data, loading, error }] = useAddPqrMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPqrMutation(baseOptions?: Apollo.MutationHookOptions<AddPqrMutation, AddPqrMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddPqrMutation, AddPqrMutationVariables>(AddPqrDocument, options);
}
export type AddPqrMutationHookResult = ReturnType<typeof useAddPqrMutation>;
export type AddPqrMutationResult = Apollo.MutationResult<AddPqrMutation>;
export type AddPqrMutationOptions = Apollo.BaseMutationOptions<AddPqrMutation, AddPqrMutationVariables>;
export const DeletePqrDocument = gql`
    mutation DeletePqr($id: ID!) {
  deletePqr(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeletePqrMutationFn = Apollo.MutationFunction<DeletePqrMutation, DeletePqrMutationVariables>;

/**
 * __useDeletePqrMutation__
 *
 * To run a mutation, you first call `useDeletePqrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePqrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePqrMutation, { data, loading, error }] = useDeletePqrMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePqrMutation(baseOptions?: Apollo.MutationHookOptions<DeletePqrMutation, DeletePqrMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePqrMutation, DeletePqrMutationVariables>(DeletePqrDocument, options);
}
export type DeletePqrMutationHookResult = ReturnType<typeof useDeletePqrMutation>;
export type DeletePqrMutationResult = Apollo.MutationResult<DeletePqrMutation>;
export type DeletePqrMutationOptions = Apollo.BaseMutationOptions<DeletePqrMutation, DeletePqrMutationVariables>;
export const UpdatePqrDocument = gql`
    mutation UpdatePqr($id: ID!, $input: PqrUpdateInput!) {
  updatePqr(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdatePqrMutationFn = Apollo.MutationFunction<UpdatePqrMutation, UpdatePqrMutationVariables>;

/**
 * __useUpdatePqrMutation__
 *
 * To run a mutation, you first call `useUpdatePqrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePqrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePqrMutation, { data, loading, error }] = useUpdatePqrMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePqrMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePqrMutation, UpdatePqrMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePqrMutation, UpdatePqrMutationVariables>(UpdatePqrDocument, options);
}
export type UpdatePqrMutationHookResult = ReturnType<typeof useUpdatePqrMutation>;
export type UpdatePqrMutationResult = Apollo.MutationResult<UpdatePqrMutation>;
export type UpdatePqrMutationOptions = Apollo.BaseMutationOptions<UpdatePqrMutation, UpdatePqrMutationVariables>;
export const GetPqrsDocument = gql`
    query GetPqrs($page: Int!, $size: Int!) {
  allPqrs(page: $page, size: $size) {
    code
    data {
      id
      typePqr
      title
      description
      argument
      answer
      state
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetPqrsQuery__
 *
 * To run a query within a React component, call `useGetPqrsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPqrsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPqrsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetPqrsQuery(baseOptions: Apollo.QueryHookOptions<GetPqrsQuery, GetPqrsQueryVariables> & ({ variables: GetPqrsQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPqrsQuery, GetPqrsQueryVariables>(GetPqrsDocument, options);
}
export function useGetPqrsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPqrsQuery, GetPqrsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPqrsQuery, GetPqrsQueryVariables>(GetPqrsDocument, options);
}
export function useGetPqrsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPqrsQuery, GetPqrsQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPqrsQuery, GetPqrsQueryVariables>(GetPqrsDocument, options);
}
export type GetPqrsQueryHookResult = ReturnType<typeof useGetPqrsQuery>;
export type GetPqrsLazyQueryHookResult = ReturnType<typeof useGetPqrsLazyQuery>;
export type GetPqrsSuspenseQueryHookResult = ReturnType<typeof useGetPqrsSuspenseQuery>;
export type GetPqrsQueryResult = Apollo.QueryResult<GetPqrsQuery, GetPqrsQueryVariables>;
export const GetPqrByIdDocument = gql`
    query GetPqrById($id: ID!) {
  pqrById(id: $id) {
    data {
      id
      typePqr
      title
      description
      argument
      answer
      state
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetPqrByIdQuery__
 *
 * To run a query within a React component, call `useGetPqrByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPqrByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPqrByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPqrByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPqrByIdQuery, GetPqrByIdQueryVariables> & ({ variables: GetPqrByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPqrByIdQuery, GetPqrByIdQueryVariables>(GetPqrByIdDocument, options);
}
export function useGetPqrByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPqrByIdQuery, GetPqrByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPqrByIdQuery, GetPqrByIdQueryVariables>(GetPqrByIdDocument, options);
}
export function useGetPqrByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPqrByIdQuery, GetPqrByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPqrByIdQuery, GetPqrByIdQueryVariables>(GetPqrByIdDocument, options);
}
export type GetPqrByIdQueryHookResult = ReturnType<typeof useGetPqrByIdQuery>;
export type GetPqrByIdLazyQueryHookResult = ReturnType<typeof useGetPqrByIdLazyQuery>;
export type GetPqrByIdSuspenseQueryHookResult = ReturnType<typeof useGetPqrByIdSuspenseQuery>;
export type GetPqrByIdQueryResult = Apollo.QueryResult<GetPqrByIdQuery, GetPqrByIdQueryVariables>;
export const AddRankingDocument = gql`
    mutation AddRanking($input: RankingInput!) {
  addRanking(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddRankingMutationFn = Apollo.MutationFunction<AddRankingMutation, AddRankingMutationVariables>;

/**
 * __useAddRankingMutation__
 *
 * To run a mutation, you first call `useAddRankingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRankingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRankingMutation, { data, loading, error }] = useAddRankingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddRankingMutation(baseOptions?: Apollo.MutationHookOptions<AddRankingMutation, AddRankingMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddRankingMutation, AddRankingMutationVariables>(AddRankingDocument, options);
}
export type AddRankingMutationHookResult = ReturnType<typeof useAddRankingMutation>;
export type AddRankingMutationResult = Apollo.MutationResult<AddRankingMutation>;
export type AddRankingMutationOptions = Apollo.BaseMutationOptions<AddRankingMutation, AddRankingMutationVariables>;
export const DeleteRankingDocument = gql`
    mutation DeleteRanking($id: ID!) {
  deleteRanking(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeleteRankingMutationFn = Apollo.MutationFunction<DeleteRankingMutation, DeleteRankingMutationVariables>;

/**
 * __useDeleteRankingMutation__
 *
 * To run a mutation, you first call `useDeleteRankingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRankingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRankingMutation, { data, loading, error }] = useDeleteRankingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRankingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRankingMutation, DeleteRankingMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteRankingMutation, DeleteRankingMutationVariables>(DeleteRankingDocument, options);
}
export type DeleteRankingMutationHookResult = ReturnType<typeof useDeleteRankingMutation>;
export type DeleteRankingMutationResult = Apollo.MutationResult<DeleteRankingMutation>;
export type DeleteRankingMutationOptions = Apollo.BaseMutationOptions<DeleteRankingMutation, DeleteRankingMutationVariables>;
export const UpdateRankingDocument = gql`
    mutation UpdateRanking($id: ID!, $input: RankingUpdateInput!) {
  updateRanking(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdateRankingMutationFn = Apollo.MutationFunction<UpdateRankingMutation, UpdateRankingMutationVariables>;

/**
 * __useUpdateRankingMutation__
 *
 * To run a mutation, you first call `useUpdateRankingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRankingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRankingMutation, { data, loading, error }] = useUpdateRankingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRankingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRankingMutation, UpdateRankingMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateRankingMutation, UpdateRankingMutationVariables>(UpdateRankingDocument, options);
}
export type UpdateRankingMutationHookResult = ReturnType<typeof useUpdateRankingMutation>;
export type UpdateRankingMutationResult = Apollo.MutationResult<UpdateRankingMutation>;
export type UpdateRankingMutationOptions = Apollo.BaseMutationOptions<UpdateRankingMutation, UpdateRankingMutationVariables>;
export const GetRankingsDocument = gql`
    query GetRankings($page: Int!, $size: Int!) {
  allRankings(page: $page, size: $size) {
    code
    data {
      id
      level
      position
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetRankingsQuery__
 *
 * To run a query within a React component, call `useGetRankingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRankingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRankingsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetRankingsQuery(baseOptions: Apollo.QueryHookOptions<GetRankingsQuery, GetRankingsQueryVariables> & ({ variables: GetRankingsQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRankingsQuery, GetRankingsQueryVariables>(GetRankingsDocument, options);
}
export function useGetRankingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRankingsQuery, GetRankingsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRankingsQuery, GetRankingsQueryVariables>(GetRankingsDocument, options);
}
export function useGetRankingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRankingsQuery, GetRankingsQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetRankingsQuery, GetRankingsQueryVariables>(GetRankingsDocument, options);
}
export type GetRankingsQueryHookResult = ReturnType<typeof useGetRankingsQuery>;
export type GetRankingsLazyQueryHookResult = ReturnType<typeof useGetRankingsLazyQuery>;
export type GetRankingsSuspenseQueryHookResult = ReturnType<typeof useGetRankingsSuspenseQuery>;
export type GetRankingsQueryResult = Apollo.QueryResult<GetRankingsQuery, GetRankingsQueryVariables>;
export const GetRankingByIdDocument = gql`
    query GetRankingById($id: ID!) {
  rankingById(id: $id) {
    data {
      id
      level
      position
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetRankingByIdQuery__
 *
 * To run a query within a React component, call `useGetRankingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRankingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRankingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRankingByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRankingByIdQuery, GetRankingByIdQueryVariables> & ({ variables: GetRankingByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRankingByIdQuery, GetRankingByIdQueryVariables>(GetRankingByIdDocument, options);
}
export function useGetRankingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRankingByIdQuery, GetRankingByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRankingByIdQuery, GetRankingByIdQueryVariables>(GetRankingByIdDocument, options);
}
export function useGetRankingByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRankingByIdQuery, GetRankingByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetRankingByIdQuery, GetRankingByIdQueryVariables>(GetRankingByIdDocument, options);
}
export type GetRankingByIdQueryHookResult = ReturnType<typeof useGetRankingByIdQuery>;
export type GetRankingByIdLazyQueryHookResult = ReturnType<typeof useGetRankingByIdLazyQuery>;
export type GetRankingByIdSuspenseQueryHookResult = ReturnType<typeof useGetRankingByIdSuspenseQuery>;
export type GetRankingByIdQueryResult = Apollo.QueryResult<GetRankingByIdQuery, GetRankingByIdQueryVariables>;
export const AddRoleDocument = gql`
    mutation AddRole($input: RoleInput!) {
  addRole(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddRoleMutationFn = Apollo.MutationFunction<AddRoleMutation, AddRoleMutationVariables>;

/**
 * __useAddRoleMutation__
 *
 * To run a mutation, you first call `useAddRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRoleMutation, { data, loading, error }] = useAddRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddRoleMutation(baseOptions?: Apollo.MutationHookOptions<AddRoleMutation, AddRoleMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddRoleMutation, AddRoleMutationVariables>(AddRoleDocument, options);
}
export type AddRoleMutationHookResult = ReturnType<typeof useAddRoleMutation>;
export type AddRoleMutationResult = Apollo.MutationResult<AddRoleMutation>;
export type AddRoleMutationOptions = Apollo.BaseMutationOptions<AddRoleMutation, AddRoleMutationVariables>;
export const DeleteRoleDocument = gql`
    mutation DeleteRole($id: ID!) {
  deleteRole(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeleteRoleMutationFn = Apollo.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options);
}
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>;
export type DeleteRoleMutationResult = Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($id: ID!, $input: RoleUpdateInput!) {
  updateRole(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
}
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const GetRolesDocument = gql`
    query GetRoles($page: Int!, $size: Int!) {
  allRoles(page: $page, size: $size) {
    code
    data {
      id
      name
      accessLevel
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetRolesQuery(baseOptions: Apollo.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables> & ({ variables: GetRolesQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
}
export function useGetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
}
export function useGetRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
}
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>;
export type GetRolesLazyQueryHookResult = ReturnType<typeof useGetRolesLazyQuery>;
export type GetRolesSuspenseQueryHookResult = ReturnType<typeof useGetRolesSuspenseQuery>;
export type GetRolesQueryResult = Apollo.QueryResult<GetRolesQuery, GetRolesQueryVariables>;
export const GetRoleByIdDocument = gql`
    query GetRoleById($id: ID!) {
  roleById(id: $id) {
    data {
      id
      name
      accessLevel
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetRoleByIdQuery__
 *
 * To run a query within a React component, call `useGetRoleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoleByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables> & ({ variables: GetRoleByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
}
export function useGetRoleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
}
export function useGetRoleByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
}
export type GetRoleByIdQueryHookResult = ReturnType<typeof useGetRoleByIdQuery>;
export type GetRoleByIdLazyQueryHookResult = ReturnType<typeof useGetRoleByIdLazyQuery>;
export type GetRoleByIdSuspenseQueryHookResult = ReturnType<typeof useGetRoleByIdSuspenseQuery>;
export type GetRoleByIdQueryResult = Apollo.QueryResult<GetRoleByIdQuery, GetRoleByIdQueryVariables>;
export const AddTaskDocument = gql`
    mutation AddTask($input: TaskInput!) {
  addTask(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options);
}
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
}
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: ID!, $input: TaskUpdateInput!) {
  updateTask(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
}
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const GetTasksDocument = gql`
    query GetTasks($page: Int!, $size: Int!) {
  allTasks(page: $page, size: $size) {
    code
    data {
      id
      name
      description
      priority
      typeTask
      state
      fCreation
      fExpiration
      reminder
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables> & ({ variables: GetTasksQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
}
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
}
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
}
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetTaskByIdDocument = gql`
    query GetTaskById($id: ID!) {
  taskById(id: $id) {
    data {
      id
      name
      description
      priority
      typeTask
      state
      fCreation
      fExpiration
      reminder
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetTaskByIdQuery__
 *
 * To run a query within a React component, call `useGetTaskByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables> & ({ variables: GetTaskByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
}
export function useGetTaskByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
}
export function useGetTaskByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
}
export type GetTaskByIdQueryHookResult = ReturnType<typeof useGetTaskByIdQuery>;
export type GetTaskByIdLazyQueryHookResult = ReturnType<typeof useGetTaskByIdLazyQuery>;
export type GetTaskByIdSuspenseQueryHookResult = ReturnType<typeof useGetTaskByIdSuspenseQuery>;
export type GetTaskByIdQueryResult = Apollo.QueryResult<GetTaskByIdQuery, GetTaskByIdQueryVariables>;
export const AddUserDocument = gql`
    mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
  updateUser(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers($page: Int!, $size: Int!) {
  allUsers(page: $page, size: $size) {
    code
    data {
      id
      name
      email
      username
    }
    date
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables> & ({ variables: GetUsersQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  userById(id: $id) {
    data {
      id
      name
      email
      username
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
}
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
}
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const AddVoucherDocument = gql`
    mutation AddVoucher($input: VoucherInput!) {
  addVoucher(input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type AddVoucherMutationFn = Apollo.MutationFunction<AddVoucherMutation, AddVoucherMutationVariables>;

/**
 * __useAddVoucherMutation__
 *
 * To run a mutation, you first call `useAddVoucherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVoucherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVoucherMutation, { data, loading, error }] = useAddVoucherMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddVoucherMutation(baseOptions?: Apollo.MutationHookOptions<AddVoucherMutation, AddVoucherMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddVoucherMutation, AddVoucherMutationVariables>(AddVoucherDocument, options);
}
export type AddVoucherMutationHookResult = ReturnType<typeof useAddVoucherMutation>;
export type AddVoucherMutationResult = Apollo.MutationResult<AddVoucherMutation>;
export type AddVoucherMutationOptions = Apollo.BaseMutationOptions<AddVoucherMutation, AddVoucherMutationVariables>;
export const DeleteVoucherDocument = gql`
    mutation DeleteVoucher($id: ID!) {
  deleteVoucher(id: $id) {
    code
    message
    date
    data
  }
}
    `;
export type DeleteVoucherMutationFn = Apollo.MutationFunction<DeleteVoucherMutation, DeleteVoucherMutationVariables>;

/**
 * __useDeleteVoucherMutation__
 *
 * To run a mutation, you first call `useDeleteVoucherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVoucherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVoucherMutation, { data, loading, error }] = useDeleteVoucherMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVoucherMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVoucherMutation, DeleteVoucherMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteVoucherMutation, DeleteVoucherMutationVariables>(DeleteVoucherDocument, options);
}
export type DeleteVoucherMutationHookResult = ReturnType<typeof useDeleteVoucherMutation>;
export type DeleteVoucherMutationResult = Apollo.MutationResult<DeleteVoucherMutation>;
export type DeleteVoucherMutationOptions = Apollo.BaseMutationOptions<DeleteVoucherMutation, DeleteVoucherMutationVariables>;
export const UpdateVoucherDocument = gql`
    mutation UpdateVoucher($id: ID!, $input: VoucherUpdateInput!) {
  updateVoucher(id: $id, input: $input) {
    code
    message
    date
    data
  }
}
    `;
export type UpdateVoucherMutationFn = Apollo.MutationFunction<UpdateVoucherMutation, UpdateVoucherMutationVariables>;

/**
 * __useUpdateVoucherMutation__
 *
 * To run a mutation, you first call `useUpdateVoucherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoucherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoucherMutation, { data, loading, error }] = useUpdateVoucherMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVoucherMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVoucherMutation, UpdateVoucherMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateVoucherMutation, UpdateVoucherMutationVariables>(UpdateVoucherDocument, options);
}
export type UpdateVoucherMutationHookResult = ReturnType<typeof useUpdateVoucherMutation>;
export type UpdateVoucherMutationResult = Apollo.MutationResult<UpdateVoucherMutation>;
export type UpdateVoucherMutationOptions = Apollo.BaseMutationOptions<UpdateVoucherMutation, UpdateVoucherMutationVariables>;
export const GetVouchersDocument = gql`
    query GetVouchers($page: Int!, $size: Int!) {
  allVouchers(page: $page, size: $size) {
    code
    data {
      id
      code
      payment {
        id
        purchaseAmount
        paymentMethod
      }
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetVouchersQuery__
 *
 * To run a query within a React component, call `useGetVouchersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVouchersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVouchersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetVouchersQuery(baseOptions: Apollo.QueryHookOptions<GetVouchersQuery, GetVouchersQueryVariables> & ({ variables: GetVouchersQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVouchersQuery, GetVouchersQueryVariables>(GetVouchersDocument, options);
}
export function useGetVouchersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVouchersQuery, GetVouchersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVouchersQuery, GetVouchersQueryVariables>(GetVouchersDocument, options);
}
export function useGetVouchersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetVouchersQuery, GetVouchersQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetVouchersQuery, GetVouchersQueryVariables>(GetVouchersDocument, options);
}
export type GetVouchersQueryHookResult = ReturnType<typeof useGetVouchersQuery>;
export type GetVouchersLazyQueryHookResult = ReturnType<typeof useGetVouchersLazyQuery>;
export type GetVouchersSuspenseQueryHookResult = ReturnType<typeof useGetVouchersSuspenseQuery>;
export type GetVouchersQueryResult = Apollo.QueryResult<GetVouchersQuery, GetVouchersQueryVariables>;
export const GetVoucherByIdDocument = gql`
    query GetVoucherById($id: ID!) {
  voucherById(id: $id) {
    data {
      id
      code
      payment {
        id
        purchaseAmount
        paymentMethod
      }
    }
    date
    code
    message
  }
}
    `;

/**
 * __useGetVoucherByIdQuery__
 *
 * To run a query within a React component, call `useGetVoucherByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoucherByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoucherByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVoucherByIdQuery(baseOptions: Apollo.QueryHookOptions<GetVoucherByIdQuery, GetVoucherByIdQueryVariables> & ({ variables: GetVoucherByIdQueryVariables; skip?: boolean; } | { skip: boolean; })) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>(GetVoucherByIdDocument, options);
}
export function useGetVoucherByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>(GetVoucherByIdDocument, options);
}
export function useGetVoucherByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>(GetVoucherByIdDocument, options);
}
export type GetVoucherByIdQueryHookResult = ReturnType<typeof useGetVoucherByIdQuery>;
export type GetVoucherByIdLazyQueryHookResult = ReturnType<typeof useGetVoucherByIdLazyQuery>;
export type GetVoucherByIdSuspenseQueryHookResult = ReturnType<typeof useGetVoucherByIdSuspenseQuery>;
export type GetVoucherByIdQueryResult = Apollo.QueryResult<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>;