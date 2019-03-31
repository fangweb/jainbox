import { Server } from './server';

class Main {
  public static async run(): Promise<void> {
    try {
      Server.start();
    } catch (error) {
      throw error;
    }
  }
}

Main.run();
