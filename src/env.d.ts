/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** The signed-in person, once they have passed both the password and the authenticator code. */
    admin: import('./lib/auth').AdminUser | null;
    /** How far through sign-in this request is (admin pages only). */
    access: import('./lib/auth').AdminAccess | null;
  }
}
