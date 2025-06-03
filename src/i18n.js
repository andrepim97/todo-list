import { createI18n } from 'vue-i18n'

const messages = {
    en: {

        login: "Login",
        email: "Email",
        password: "Password",
        invalidCredentials: "Invalid credentials. Please try again.",
        hide_password: "Hide",
        show_password: "Show",
        no_account_register: "Don't have an account? Register",

        register: "Register",
        name: "Name",
        confirm_password: "Confirm password",
        passwords_do_not_match: "Passwords do not match",
        already_have_account: "Already have an account? Log in",

        logout: "Logout",

        language_pt: "Portuguese",
        language_en: "English",

        back: "Back",
        edit: "Edit",
        delete: "Delete",
        details: "Details",

        taskListTitle: "Task List",
        searchTasks: "Search tasks...",
        filterByPriority: "Filter by priority",
        filterByStatus: "Filter by status",
        all: "All",
        low: "Low",
        medium: "Medium",
        high: "High",
        completed: "Completed",
        pending: "Pending",
        sortBy: "Sort by",
        creationDate: "Creation Date",
        dueDate: "Due Date",
        priority: "Priority",
        ascending: "Ascending",
        descending: "Descending",
        resetFilters: "Reset Filters",
        noTasksFound: "No tasks found",
        tasks: "Tasks",
        task: "Task",
        addTask: "Add Task",
        overdue: "Overdue",
        days: "days",
        confirmDelete: "Are you sure you want to delete",

        taskDetailsTitle: "Task Details",
        description: "Description",
        noDescription: "No description.",
        detailsSection: "Details",
        status: "Status",
        yes: "Yes",
        no: "No",
        record: "Record",
        createdAt: "Created at",
        updatedAt: "Updated at",
        deleteTask: "Delete Task",
        confirmDeleteTask: "Are you sure you want to delete the task",

        profile: "Profile",

        back_to_top: "Back to top",
    },
    pt: {

        login: "Iniciar Sessão",
        email: "Email",
        password: "Palavra-passe",
        invalidCredentials: "Credenciais inválidas. Por favor, tente novamente.",
        hide_password: "Ocultar",
        show_password: "Ver",
        no_account_register: "Ainda não tem conta? Registe-se",

        logout: "Terminar sessão",

        register: "Registar",
        name: "Nome",
        confirm_password: "Confirmar palavra-passe",
        passwords_do_not_match: "As palavras-passe não coincidem",
        already_have_account: "Já tem conta? Inicie sessão",

        language_pt: "Português",
        language_en: "Inglês",

        back: "Voltar",
        edit: "Editar",
        delete: "Eliminar",
        details: "Detalhes",

        taskListTitle: "Lista de Tarefas",
        searchTasks: "Pesquisar tarefas...",
        filterByPriority: "Filtrar por prioridade",
        filterByStatus: "Filtrar por estado",
        all: "Todas",
        low: "Baixa",
        medium: "Média",
        high: "Alta",
        completed: "Concluídas",
        pending: "Por concluir",
        sortBy: "Ordenar por",
        creationDate: "Data de criação",
        dueDate: "Data limite",
        priority: "Prioridade",
        ascending: "Ascendente",
        descending: "Descendente",
        resetFilters: "Limpar Filtros",
        noTasksFound: "Nenhuma tarefa encontrada",
        tasks: "Tarefas",
        task: "Tarefa",
        addTask: "Adicionar Tarefa",
        overdue: "Em atraso",
        days: "dias",
        confirmDelete: "Tem a certeza que quer eliminar",

        taskDetailsTitle: "Detalhes da Tarefa",
        description: "Descrição",
        noDescription: "Sem descrição.",
        detailsSection: "Detalhes",
        status: "Concluída",
        yes: "Sim",
        no: "Não",
        record: "Registo",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        deleteTask: "Eliminar tarefa",
        confirmDeleteTask: "Tem a certeza que quer eliminar a tarefa",

        profile: "Perfil",

        back_to_top: "Voltar ao topo",
    }
}

const i18n = createI18n({
    legacy: false, // para Composition API
    locale: 'pt',  // língua padrão
    fallbackLocale: 'en',
    messages
})

export default i18n
