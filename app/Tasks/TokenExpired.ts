import { BaseTask } from 'adonis5-scheduler/build'
import ApiToken from 'App/Models/ApiToken'
import moment from 'moment'

export default class TokenExpired extends BaseTask {
  public static get schedule() {
    return '0 0 * * *'
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    const today = moment().format('YYYY-MM-DD')
    const tokens = await ApiToken.query().where('expires_at', '<', today)

    for (const token of tokens) {
      token.delete()
    }
  }
}
