import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { IpAddressService } from '../_services/ip-service.service';

@Component({
  selector: 'ew-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup; // Gruppe von Controls, die an das HTML-Formular gebunden wird

  // Status-variablen
  loading = false;
  submitted = false; // Steuerung der Controls im Template

  returnUrl: string; // falls die Login-Komponente von einer protected Seite aufgerufen wurde

  error = ''; // Fehlermeldung (text)

  ipAddress: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private ip: IpAddressService
  ) { }

  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }

  ngOnInit(): void {
    // Formularmodell bauen => Controls und Regeln
    this.loginGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // we won't wait for the IP-Address (external service) to proceed with the login
    this.getIP();
  }

  // Hilfsmethode für einfacheren Zugriff auf dei CIntrols im HTML-Template
  get loginForm() { return this.loginGroup.controls; }

  // Event Handler für das Formular (Gruppe)
  onSubmit() {
    this.submitted = true;

    // Falls das Formular ungültig ist, abbrechen
    if (this.loginGroup.invalid) { return; }

    this.loading = true;
    this.authenticationService.login(this.loginForm.username.value, this.loginForm.password.value, this.ipAddress)
    .pipe(first()) // nur das erste item im observable stream (falls wiedererwarten mehrere kommen)
    .subscribe(
      () => {
      // zurück, wo man her kam --> wenn's /login war, dann / da kein param in der route war
      // monentan immer /home, man könnte evtl. '' auf home routen, home prüft ja (nachher) auf OK/login
        this.router.navigate([this.returnUrl || '/home']);
      },
      error => {
        this.error = error; // im template über ngIf angezeigt
        this.loading = false;
      }
    );

    // this.router.navigate([this.returnUrl]);
  }
}
