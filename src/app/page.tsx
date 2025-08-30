// This file is redirecting to the default locale.
import {redirect} from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
