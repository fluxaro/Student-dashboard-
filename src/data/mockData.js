/**
 * Mock Data for Student Course Dashboard
 * Design Concept: Guild & Ledger (Featuring Nigerian Scholars & Faculty)
 */

/**
 * Mock User Accounts with credentials for login testing
 */
export const mockUsers = [
  {
    id: "stu_8829",
    name: "Chidi Okonkwo",
    email: "chidi.okonkwo@guild.ac",
    password: "demo123",
    role: "Senior Research Scholar",
    cohort: "Cohort IX (Distributed Systems & Craft)",
    enrolledSince: "Autumn 2025",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=250",
  },
  {
    id: "stu_4412",
    name: "Ngozi Adeyemi",
    email: "ngozi.adeyemi@guild.ac",
    password: "demo123",
    role: "Senior Fellow in Applied Systems",
    cohort: "Cohort VIII (Formal Logic & Systems)",
    enrolledSince: "Spring 2025",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=250",
  },
  {
    id: "stu_7731",
    name: "Babajide Adeleke",
    email: "babajide.adeleke@guild.ac",
    password: "demo123",
    role: "Junior Scholar",
    cohort: "Cohort X (Spatial Ergonomics)",
    enrolledSince: "Winter 2026",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=250",
  },
  {
    id: "stu_0001",
    name: "Amina Bello",
    email: "amina.bello@guild.ac",
    password: "demo123",
    role: "Standard Scholar",
    cohort: "Cohort General (Engineering)",
    enrolledSince: "2026",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=250",
  },
];

// Default primary mock student
export const mockStudent = mockUsers[0];

export const initialCourses = [
  {
    id: "course-dist-sys",
    code: "CS-401",
    title: "Distributed Systems Architecture & Consensus",
    instructor: {
      name: "Prof. Olumide Adebayo",
      title: "Chair of Distributed Computing",
      avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=200",
    },
    category: "Computer Systems",
    level: "Advanced",
    duration: "6 Weeks",
    description: "An intensive monograph into state machine replication, Raft/Paxos consensus invariants, vector clocks, and partition tolerance in high-throughput topologies.",
    lessons: [
      {
        id: "les-ds-1",
        title: "Synchrony vs Asynchrony in Network Models",
        duration: "42 min",
        description: "Formalizing partial synchrony, network partitions, and fail-stop vs Byzantine failure assumptions.",
        completed: true,
      },
      {
        id: "les-ds-2",
        title: "Logical Timestamps & Lamport Clocks",
        duration: "55 min",
        description: "Total ordering of events, causal histories, and vector clock mathematics.",
        completed: true,
      },
      {
        id: "les-ds-3",
        title: "State Machine Replication & Leader Election",
        duration: "68 min",
        description: "Deconstructing Paxos consensus rounds, quorum intersections, and term-based lease mechanics.",
        completed: true,
      },
      {
        id: "les-ds-4",
        title: "Raft Log Compaction & Snapshotting",
        duration: "50 min",
        description: "Practical implementations of invariant preservation during disk serialization and compaction.",
        completed: false,
      },
      {
        id: "les-ds-5",
        title: "Byzantine Fault Tolerance in Gossip Networks",
        duration: "60 min",
        description: "PBFT protocols, signature aggregation, and resistance against adversarial nodes.",
        completed: false,
      },
    ],
  },
  {
    id: "course-type-theory",
    code: "SE-310",
    title: "Advanced Type Systems & Category Theory",
    instructor: {
      name: "Dr. Ifeoma Nnamdi",
      title: "Senior Fellow in Formal Logic",
      avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200",
    },
    category: "Software Engineering",
    level: "Intermediate",
    duration: "4 Weeks",
    description: "Rigorous exploration of Curry-Howard isomorphism, polymorphic lambda calculus, dependent typing, and algebraic effect systems.",
    lessons: [
      {
        id: "les-tt-1",
        title: "Simply Typed Lambda Calculus (STLC)",
        duration: "35 min",
        description: "Syntax, evaluation semantics, typing judgements, and proof of type safety.",
        completed: true,
      },
      {
        id: "les-tt-2",
        title: "Algebraic Data Types & Pattern Completeness",
        duration: "48 min",
        description: "Sum types, product types, exponential objects, and exhaustive match verification.",
        completed: true,
      },
      {
        id: "les-tt-3",
        title: "Parametric Polymorphism & System F",
        duration: "60 min",
        description: "Universal quantifiers, type erasure, existential types, and abstraction barriers.",
        completed: true,
      },
      {
        id: "les-tt-4",
        title: "Monads, Functors & Categorical Semantics",
        duration: "52 min",
        description: "Composition of morphisms, natural transformations, and effect tracking.",
        completed: true,
      },
    ],
  },
  {
    id: "course-fluid-dynamics",
    code: "EN-502",
    title: "Computational Fluid Dynamics & Grid Modeling",
    instructor: {
      name: "Prof. Emeka Okafor",
      title: "Principal Research Engineer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    },
    category: "Engineering",
    level: "Advanced",
    duration: "8 Weeks",
    description: "Numerical discretization of Navier-Stokes equations, mesh refinement strategies, boundary layer simulations, and turbulent kinetic energy solvers.",
    lessons: [
      {
        id: "les-cfd-1",
        title: "Derivation of the Navier-Stokes System",
        duration: "58 min",
        description: "Conservation of mass, momentum, and energy across differential control volumes.",
        completed: false,
      },
      {
        id: "les-cfd-2",
        title: "Finite Volume Discretization & Stencil Calculus",
        duration: "64 min",
        description: "Flux approximation across non-orthogonal polyhedral grid cells.",
        completed: false,
      },
      {
        id: "les-cfd-3",
        title: "Pressure-Velocity Coupling Algorithms (SIMPLE)",
        duration: "75 min",
        description: "Staggered grid arrangements and iterative convergence criteria.",
        completed: false,
      },
      {
        id: "les-cfd-4",
        title: "Turbulence Modeling: k-epsilon vs k-omega",
        duration: "62 min",
        description: "Reynolds-averaged equations, eddy viscosity hypotheses, and wall functions.",
        completed: false,
      },
      {
        id: "les-cfd-5",
        title: "Adaptive Mesh Refinement & Courant Stability",
        duration: "50 min",
        description: "Dynamic quadtree partitioning and CFL condition bounds for supersonic shocks.",
        completed: false,
      },
      {
        id: "les-cfd-6",
        title: "High-Performance GPU Solvers with CUDA",
        duration: "80 min",
        description: "Memory coalescing and parallel stencil computations on tensor architectures.",
        completed: false,
      },
    ],
  },
  {
    id: "course-spatial-interfaces",
    code: "DS-220",
    title: "Spatial Interface Design & Human Ergonomics",
    instructor: {
      name: "Zainab Danjuma",
      title: "Master of Spatial Architecture",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    },
    category: "Design",
    level: "Intermediate",
    duration: "5 Weeks",
    description: "Physical ergonomics, depth cues, volumetric interaction models, and legible typography in stereoscopic and spatial computing environments.",
    lessons: [
      {
        id: "les-si-1",
        title: "Foveated Vision & Depth Perception Mechanics",
        duration: "38 min",
        description: "Stereopsis, parallax, vergence-accommodation conflict, and gaze heatmaps.",
        completed: true,
      },
      {
        id: "les-si-2",
        title: "Volumetric Layout Grids & Distance Hierarchies",
        duration: "46 min",
        description: "Establishing ergonomic comfort cones, spherical projection, and UI anchoring.",
        completed: true,
      },
      {
        id: "les-si-3",
        title: "Tactile Haptics & Spatial Audio Feedback",
        duration: "54 min",
        description: "HRTF audio spatialization, binaural cues, and subtle micro-vibrational feedback.",
        completed: false,
      },
      {
        id: "les-si-4",
        title: "Direct Manipulation vs Indirect Gaze Pinching",
        duration: "45 min",
        description: "Kinematic motion tracking, velocity damping, and gesture intent classification.",
        completed: false,
      },
      {
        id: "les-si-5",
        title: "Accessibility Standards for Spatial Headsets",
        duration: "40 min",
        description: "Designing for motor tremor mitigation, single-eye vision, and seated postures.",
        completed: false,
      },
    ],
  },
  {
    id: "course-cryptography",
    code: "MA-515",
    title: "Applied Cryptography & Zero-Knowledge Proofs",
    instructor: {
      name: "Dr. Folashade Balogun",
      title: "Lead Cryptographer & Research Director",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    },
    category: "Mathematics",
    level: "Advanced",
    duration: "6 Weeks",
    description: "Elliptic curve pairings, discrete logarithm hardness, SNARK/STARK arithmetization, polynomial commitment schemes, and verifiable computing.",
    lessons: [
      {
        id: "les-zk-1",
        title: "Galois Fields & Elliptic Curve Arithmetic",
        duration: "50 min",
        description: "Finite field operations, Weierstrass curves, and scalar multiplication algorithms.",
        completed: false,
      },
      {
        id: "les-zk-2",
        title: "Bilinear Pairings & KZG Polynomial Commitments",
        duration: "65 min",
        description: "Tate and Weil pairings, trusted setup parameter evaluation, and opening proofs.",
        completed: false,
      },
      {
        id: "les-zk-3",
        title: "R1CS & Quadratic Arithmetic Programs (QAP)",
        duration: "70 min",
        description: "Translating computational circuits into polynomial constraint systems.",
        completed: false,
      },
      {
        id: "les-zk-4",
        title: "Plonk & Halo Recursive Proof Composition",
        duration: "85 min",
        description: "Permutation arguments, grand product checks, and accumulator-based recursion.",
        completed: false,
      },
    ],
  },
];

/**
 * Computes course status and progress dynamically from lesson completion states.
 * 
 * @param {Object} course - The course object with lessons array
 * @param {Set<string>|Array<string>|null} completedLessonIds - Optional set of completed lesson IDs
 * @returns {Object} Course with computed totalLessons, completedLessons, progress, and status
 */
export function computeCourseMetrics(course, completedLessonIds = null) {
  const totalLessons = course.lessons?.length || 0;
  
  let completedLessons = 0;
  if (completedLessonIds) {
    const idSet = completedLessonIds instanceof Set 
      ? completedLessonIds 
      : new Set(completedLessonIds);
    completedLessons = course.lessons.filter(l => idSet.has(l.id)).length;
  } else {
    completedLessons = course.lessons.filter(l => l.completed).length;
  }

  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  let status = "Not Started";
  if (completedLessons === totalLessons && totalLessons > 0) {
    status = "Completed";
  } else if (completedLessons > 0) {
    status = "In Progress";
  }

  return {
    ...course,
    totalLessons,
    completedLessons,
    progress,
    status,
  };
}

/**
 * Returns all initial courses with computed metrics.
 */
export function getInitialComputedCourses() {
  return initialCourses.map(course => computeCourseMetrics(course));
}
